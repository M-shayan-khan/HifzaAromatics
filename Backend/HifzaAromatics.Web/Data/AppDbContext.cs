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
            base.OnModelCreating(modelBuilder);

            // Precision set karna Price ke liye
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            // Automatic Sample Data (Seed Data)
            modelBuilder.Entity<Product>().HasData(
                new Product 
                { 
                    Id = 1, 
                    Name = "Royal Oud", 
                    Category = "Woody & Spicy", 
                    Price = 15000.00m, 
                    ImageUrl = "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop&q=60" 
                },
                new Product 
                { 
                    Id = 2, 
                    Name = "Velvet Rose", 
                    Category = "Floral", 
                    Price = 12000.00m, 
                    ImageUrl = "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=60" 
                },
                new Product 
                { 
                    Id = 3, 
                    Name = "Amber Vanilla", 
                    Category = "Sweet & Oriental", 
                    Price = 13500.00m, 
                    ImageUrl = "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&auto=format&fit=crop&q=60" 
                }
            );
        }
    }
}