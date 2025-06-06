using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Learning_Managament_System.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required, NotNull]
        public string? Name { get; set; }

        [Required, NotNull]
        public string? Email { get; set; }

        [Required, NotNull]
        public string? Password { get; set; }

        public IEnumerable<Course> Courses { get; set; } = new List<Course>();
    }
}
