

using System.ComponentModel.DataAnnotations;

namespace Learning_Managament_System.Models
{
    public class CourseRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Course? Course { get; set; }

        [Required]
        public Student? Student { get; set; }

        [Required]
        public Teacher? Teacher { get; set; }

        public bool IsPaymentDone { get; set; } = false;
        public bool IsAccepted { get; set; } = false;
    }
}
