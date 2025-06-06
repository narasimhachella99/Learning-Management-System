using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Learning_Managament_System.DataLayer;
using Learning_Managament_System.Models;
using Microsoft.AspNetCore.Cors;
using Learning_Managament_System.Dto;
using Microsoft.VisualBasic;

namespace Learning_Managament_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class CourseRequestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseRequestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("update/{id}/{canAccept}")]
        public async Task<ActionResult<CourseRequest>> UpdateAction(int id, bool canAccept)
        {
            if (_context.CourseRequest == null)
            {
                return NotFound();
            }

            var request = await _context.CourseRequest
                .FindAsync(id);

            if (request == null)
            {
                return BadRequest(new { msg = "Cannot find request with the id" });
            }
            else
            {
                if (canAccept)
                {
                    request.IsPaymentDone = true;
                    var student = request.Student;
                    if (student == null)
                    {
                        return BadRequest(new { msg = "Student not found in the request , please check agian" });
                    }
                    if (request.Course == null)
                    {
                        return BadRequest(new { msg = "Course not found in the request, please check agian" });
                    }

                    var newList = student.Courses.Append(request.Course);
                    student.Courses = newList;
                    _context.Entry(student).State = EntityState.Modified;
                    _context.Entry(request).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
            }
            return BadRequest(new { msg = "Something went wrong , please try again" });
        }


        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<CourseRequest>>> FilterRequests(int? studentId = null)
        {
            if (_context.CourseRequest == null)
            {
                return NotFound();
            }
            if (studentId == null)
            {
                return await _context.CourseRequest.ToListAsync();
            }
            else
            {
                return await _context.CourseRequest
                    .Include(u => u.Course)
                    .Include(u => u.Student)
                    .Where(c => c.Student!.Id == studentId)
                    .ToListAsync();
            }
        }

        // GET: api/CourseRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseRequest>>> GetCourseRequest(int? teacherId = null)
        {
            if (_context.CourseRequest == null)
            {
                return NotFound();
            }
            if (teacherId == null)
            {
                return await _context.CourseRequest.ToListAsync();
            }
            else
            {
                return await _context.CourseRequest
                    .Include(u => u.Teacher)
                    .Include(u => u.Course)
                    .Where(c => c.Teacher!.Id == teacherId)
                    .ToListAsync();
            }
        }

        // GET: api/CourseRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseRequest>> GetCourseRequest(int id)
        {
            if (_context.CourseRequest == null)
            {
                return NotFound();
            }
            var courseRequest = await _context.CourseRequest.FindAsync(id);

            if (courseRequest == null)
            {
                return NotFound();
            }

            return courseRequest;
        }

        // PUT: api/CourseRequests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourseRequest(int id, CourseRequest courseRequest)
        {
            if (id != courseRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(courseRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<CourseRequest>> PostCourseRequest(CourseRequestDto dto)
        {
            if (_context.CourseRequest == null)
            {
                return Problem("Entity set 'ApplicationDbContext.CourseRequest'  is null.");
            }

            var course = await _context.Courses.FindAsync(dto.CourseId);
            var student = await _context.Students.FindAsync(dto.StudentId);
            var teacher = await _context.Teachers.FindAsync(dto.TeacherId);

            if (course == null || student == null || teacher == null)
            {
                return BadRequest(new { msg = "Invalid id's plesae check once again" });
            }

            var courseRequest = new CourseRequest()
            {
                Course = course,
                Teacher = teacher,
                Student = student,
            };
            _context.CourseRequest.Add(courseRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourseRequest", new { id = courseRequest.Id }, courseRequest);
        }

        // DELETE: api/CourseRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourseRequest(int id)
        {
            if (_context.CourseRequest == null)
            {
                return NotFound();
            }
            var courseRequest = await _context.CourseRequest.FindAsync(id);
            if (courseRequest == null)
            {
                return NotFound();
            }

            _context.CourseRequest.Remove(courseRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseRequestExists(int id)
        {
            return (_context.CourseRequest?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
