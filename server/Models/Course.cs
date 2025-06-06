using System.ComponentModel.DataAnnotations;

namespace Learning_Managament_System.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public int Price { get; set; } = 0;

        [Required]
        public int NumberOfDays { get; set; } = 0;

        [Required]
        public int BatchSize { get; set; } = 10;

        [Required]
        public Teacher? AddedBy { get; set; }
    }
}
