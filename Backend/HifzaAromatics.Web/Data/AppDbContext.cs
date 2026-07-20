using Microsoft.EntityFrameworkCore;
using HifzaAromatics.Web.Models;

namespace HifzaAromatics.Web.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Yahan hum Price ke liye precision set kar rahe hain (18, 2 ka matlab hai 18 digits total, 2 decimal places)
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);
        }
    }
}