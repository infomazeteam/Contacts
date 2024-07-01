using Contacts.Controllers;
using ContactService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace UnitTestContact
{
    [TestClass]
    public class UnitTest1
    {
        private ContactController _controller;
        private ContactDbContext _dbContext;

        [TestInitialize]
        public void TestInitialize()
        {
            var options = new DbContextOptionsBuilder<ContactDbContext>()
                .UseInMemoryDatabase(databaseName: "ContactsDb")
                .Options;

            _dbContext = new ContactDbContext(options);
            _controller = new ContactController(_dbContext);
        }

        [TestCleanup]
        public void TestCleanup()
        {
            _dbContext.Dispose();
        }

        #region Add Test Method

        [TestMethod]
        public async Task Create()
        {
            // Arrange
            var model = new ContactModel
            {
                FirstName = "Liam",
                LastName = "Noah",
                Email = "sample1@gmail.com",
                Mobile = "(415) 555‑0132",
                Phone = "890 765 4321",
                Address1 = "Langone Medical Center",
                Address2 = "Ave",
                City = "New York",
                State = "NY",
                Zip = "10016",
                Country = "USA",
            };

            // Act
            var result = await _controller.Add(model) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(model, result.Value); // Optionally, assert the returned model if needed
        }

        #endregion

        #region Update Test Methods

        [TestMethod]
        public async Task Update()
        {
            // Arrange
            var updatedModel = new ContactModel
            {
                ContactID = 1, // Existing ContactID to update
                FirstName = "Henry",
                LastName = "Lucas",
                Email = "sample1@example.com",
                Mobile = "987 6543 210",
                Phone = "890 7654 321",
                Address1 = "Mercer Res",
                Address2 = "240 Mercer",
                City = "New York",
                State = "NY",
                Zip = "10012",
                Country = "USA",
            };

            // Act
            var result = await _controller.Add(updatedModel) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);

            var updatedContact = result.Value as ContactModel;
            Assert.IsNotNull(updatedContact);
            Assert.AreEqual(updatedModel.FirstName, updatedContact.FirstName);
            Assert.AreEqual(updatedModel.LastName, updatedContact.LastName);
            Assert.AreEqual(updatedModel.Email, updatedContact.Email);
            // Add more assertions as per your requirements
        }
        #endregion

        #region Delete Test Methods
        [TestMethod]
        public async Task Delete()
        {
            // Act
            var result = await _controller.Delete(6) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);

            // Optionally, check response content
            var response = result.Value as dynamic; // Using 'dynamic' for simplicity, adjust based on actual response type
            Assert.IsNotNull(response);
        }

        #endregion
    }
}
