using System.ComponentModel.DataAnnotations;

namespace Learning_Managament_System.Models
{
    public class Batch
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public Course? Course { get; set; }
        public IEnumerable<Student> Students { get; set; } = new List<Student>();
    }
}
