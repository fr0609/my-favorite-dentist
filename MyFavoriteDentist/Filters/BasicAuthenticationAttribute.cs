using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace MyFavoriteDentist.Filters
{
    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = createUnauthorizedResponse(actionContext);
            }
            else
            {
                string authenticationToken = actionContext.Request.Headers.Authorization.Parameter;
                string decodedToken = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationToken));
                string[] usernamePasswordArray = decodedToken.Split(':');
                string headerUserName = usernamePasswordArray[0];
                string headerPassword = usernamePasswordArray[1];

                string configUserName = ConfigurationManager.AppSettings["ApiUserName"];
                string configPassword = ConfigurationManager.AppSettings["ApiPassword"];

                if ((!headerUserName.Equals(configUserName)) || (!headerPassword.Equals(configPassword)))
                {
                    actionContext.Response = createUnauthorizedResponse(actionContext);
                }
            }
        }

        private HttpResponseMessage createUnauthorizedResponse(HttpActionContext actionContext)
        {
            return actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
        }
    }
}