using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Learning_Managament_System.Models
{
    public class Teacher
    {
        [Key]
        public int Id { get; set; }

        [Required, NotNull]
        public string? Name { get; set; }

        [Required, NotNull]
        public string? Email { get; set; }

        [Required, NotNull]
        public string? Password { get; set; }
    }
}
