using Learning_Managament_System.Models;

namespace Learning_Managament_System.Dto
{
    public class LoginDto
    {
        public string? Email { get; set; }
        public string? PassWord { get; set; }
    }

    public class CourseDto
    {
        public Course Course { get; set; }
        public int TeacherId { get; set; }
    }

    public class CourseRequestDto
    {
        public int CourseId { get; set; }
        public int TeacherId { get; set; }
        public int StudentId { get; set; }
    }
}
