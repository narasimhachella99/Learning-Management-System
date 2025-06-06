using Learning_Managament_System.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning_Managament_System.DataLayer
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Batch> Batches { get; set; }
        public DbSet<CourseRequest>? CourseRequest { get; set; }
    }
}
