using ContactService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Net;
using System.Numerics;
using System.Reflection;

namespace Contacts.Controllers
{
    public class ContactController : Controller
    {
        private readonly ContactDbContext _contactDbContext;

        public ContactController(ContactDbContext _contactDbContexts)
        {
            _contactDbContext = _contactDbContexts;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Add()
        {
            ContactModel model = new ContactModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ContactModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (model.ContactID > 0)
                    {
                        _contactDbContext.Update(model);
                    }
                    else
                    {
                        await _contactDbContext.Contacts.AddAsync(model);
                    }

                    await _contactDbContext.SaveChangesAsync();

                    return Ok(model);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ContactList()
        {
            try
            {
                int draw = Convert.ToInt32(Request.Form["draw"].FirstOrDefault());
                int start = Convert.ToInt32(Request.Form["start"].FirstOrDefault());
                int length = Convert.ToInt32(Request.Form["length"].FirstOrDefault() ?? "10");
                string searchValue = Request.Form["search[value]"].FirstOrDefault();
                string sortColumn = Request.Form[$"columns[{Request.Form["order[0][column]"].FirstOrDefault()}][data]"].FirstOrDefault();
                string sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();

                IQueryable<ContactModel> data = _contactDbContext.Set<ContactModel>().Where(x => x.IsDeleted == false); // Filter added here

                if (!string.IsNullOrEmpty(searchValue))
                {
                    data = data.Where(x => x.FirstName.ToLower().Contains(searchValue.ToLower()) ||  x.LastName.ToLower().Contains(searchValue.ToLower()));
                }

                int recordsTotal = await data.CountAsync();

                // Sorting
                if (!string.IsNullOrEmpty(sortColumn) && !string.IsNullOrEmpty(sortColumnDirection))
                {
                    switch (sortColumn)
                    {
                        case "firstName":
                            data = sortColumnDirection.ToLower() == "asc" ? data.OrderBy(x => x.FirstName) : data.OrderByDescending(x => x.FirstName);
                            break;
                        case "lastName":
                            data = sortColumnDirection.ToLower() == "asc" ? data.OrderBy(x => x.LastName) : data.OrderByDescending(x => x.LastName);
                            break;
                        default:
                            break;
                    }
                }

                int recordsFiltered = await data.CountAsync();

                // Pagination
                var contactList = await data.Skip(start).Take(length).ToListAsync();

                var returnObj = new
                {
                    draw = draw,
                    recordsTotal = recordsTotal,
                    recordsFiltered = recordsFiltered,
                    data = contactList
                };
                return Json(returnObj);
            }
            catch (Exception ex)
            {
                return Json(new { error = "An error occurred while processing your request." });
            }
        }
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var contact = await _contactDbContext.Contacts.FindAsync(id);
            return View("~/Views/Contact/Add.cshtml", contact);
        }
        public async Task<IActionResult> Details(int id)
        {
            var contact = await _contactDbContext.Contacts.FirstOrDefaultAsync(m => m.ContactID == id);
            return PartialView("_ContactDetails", contact);
        }
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _contactDbContext.Contacts.FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }
            entity.IsDeleted = true;

            _contactDbContext.Contacts.Update(entity);
            await _contactDbContext.SaveChangesAsync();

            // Prepare a response indicating successful soft deletion
            var response = new
            {
                IsDeleted = true,
                DeletedEntity = entity // Optionally include the deleted entity in the response
            };

            return Ok(response);
        }
    }
}

