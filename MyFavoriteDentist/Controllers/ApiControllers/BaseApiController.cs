using MyFavoriteDentist.DBContext;
using MyFavoriteDentist.DBContext.Interfaces;
using MyFavoriteDentist.Utils;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace MyFavoriteDentist.Controllers.ApiControllers
{
    /// <summary>
    /// Base API Controller. All the API Controllers should inherit from this controller.
    /// </summary>
    public class BaseApiController : ApiController
    {
        protected IMyFavoriteDentistEntities _dbContext = new MyFavoriteDentistEntities();
        private JsonSerializerSettings settings;

        public BaseApiController()
        {
            settings = new JsonSerializerSettings();
            settings.ContractResolver = new LowercaseContractResolver(); //To lowercase json keys
        }

        public BaseApiController(IMyFavoriteDentistEntities context) {
            _dbContext = context; //Instance of the DB Context
            settings = new JsonSerializerSettings();
            settings.ContractResolver = new LowercaseContractResolver(); //To lowercase json keys
        }

        /// <summary>
        /// This method serializes any object to JSON and put it in the content of the response
        /// </summary>
        /// <param name="response"></param>
        /// <param name="obj"></param>
        /// <returns>HttpResponseMessage</returns>
        protected HttpResponseMessage ToJson(HttpResponseMessage response, dynamic obj)
        {
            response.Content = new StringContent(JsonConvert.SerializeObject(obj, Formatting.Indented, settings), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
