using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace ContactService
{
    public class ContactConfiguration : IEntityTypeConfiguration<ContactModel>
    {
        public void Configure(EntityTypeBuilder<ContactModel> builder)
        {
            builder.ToTable("Contacts");
            builder.Property(s => s.FirstName)
                .IsRequired(true);
            builder.Property(s => s.LastName)
                .IsRequired(true);

            builder.Property(p => p.CreatedOn)
           .HasDefaultValueSql("getdate()");

            builder.HasData(

                new ContactModel
                {
                    ContactID = 1,
                    FirstName = "James",
                    LastName = "Elijah",
                    Email = "sample@gmail.com",
                    Mobile = "191-212-456-7890",
                    Phone = "001-212-456-7890",
                    Address1 = "My Street",
                    Address2 = "Kingston",
                    City = "New York",
                    State = "New York",
                    Zip = "10011",
                    Country = "USA",
                }
            );
        }
    }
}
