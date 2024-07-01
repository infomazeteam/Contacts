using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace ContactService
{
    public class ContactModel
    {
       [Key]
       public int ContactID { get; set; }
       [Required(ErrorMessage = "Please enter first name.")]
       public string? FirstName { get; set; } = null;
       [Required(ErrorMessage = "Please enter last name.")]
       public string? LastName{ get; set; }= null;
       public string? Email { get; set; }= null;
       public string? Mobile { get; set; }= null;
       public string? Phone { get; set; }= null;
       
       public string? Address1 { get; set; }= null;
       public string? Address2 { get; set; }= null;
       public string? City { get; set; }= null;
       public string? State { get; set; }= null;
       public string? Zip { get; set; }= null;
       public string? Country { get; set; } = null;
       public bool? IsDeleted { get; set; } = false;
      [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
      [DefaultValue(typeof(DateTime), "getdate()")] 
      public DateTime CreatedOn { get; set; }
    }
}
