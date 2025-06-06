using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Learning_Managament_System.DataLayer;
using Learning_Managament_System.Models;
using Microsoft.AspNetCore.Cors;
using Learning_Managament_System.Dto;

namespace Learning_Managament_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Courses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses(int? teacherId = null)
        {
            if (_context.Courses == null)
            {
                return NotFound();
            }
            if (teacherId == null)
            {
                return await _context.Courses.ToListAsync();
            }
            else
            {
                return await _context.Courses
                    .Include(u => u.AddedBy)
                    .Where(t => t.AddedBy!.Id == teacherId)
                    .ToListAsync();

            }
        }

        // GET: api/Courses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            if (_context.Courses == null)
            {
                return NotFound();
            }
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }

        // PUT: api/Courses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.Id)
            {
                return BadRequest();
            }

            _context.Entry(course).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
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

        // POST: api/Courses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(CourseDto dto)
        {
            if (_context.Courses == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Courses'  is null.");
            }
            var teacher = await _context.Teachers
                .Where(t => t.Id == dto.TeacherId)
                .FirstOrDefaultAsync();
            if (teacher == null)
            {
                return BadRequest(new { msg = $"Teacher not found with the id : {dto.TeacherId}" });
            }
            var course = new Course()
            {
                Name = dto.Course.Name,
                AddedBy = teacher,
                BatchSize = dto.Course.BatchSize,
                Description = dto.Course.Description,
                NumberOfDays = dto.Course.NumberOfDays,
                Price = dto.Course.Price
            };
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourse", new { id = course.Id }, course);
        }

        // DELETE: api/Courses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            if (_context.Courses == null)
            {
                return NotFound();
            }
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return (_context.Courses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
