using ContactService;
using Microsoft.EntityFrameworkCore;

namespace ContactService
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ContactConfiguration());
        }
        public DbSet<ContactModel> Contacts { get; set; }
    }
}
