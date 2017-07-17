using MyFavoriteDentist.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;

namespace MyFavoriteDentist.Utils
{
    public static class Utilities
    {
        /// <summary>
        /// Gets the base url of the app
        /// </summary>
        /// <returns>Base URL</returns>
        public static string GetApiBaseUrl()
        {
            HttpRequest request = HttpContext.Current.Request;
            return String.Format("{0}://{1}/api/", request.Url.Scheme, request.Url.Authority);
        }

        /// <summary>
        /// Builds the hypermedia links for the responses (HATEOAS)
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <param name="target">Target (e.g. patients/ or treatments/)</param>
        /// <returns></returns>
        public static IEnumerable<LinkModel> GetHypermedia(int id, string target)
        {
            string patientsUrl = String.Format("{0}{1}{2}", Utilities.GetApiBaseUrl(), target, id);
            var links = new []
            {
                new LinkModel
                {
                    Verb = Constants.GET_VERB,
                    Rel = Constants.SELF_REL,
                    Href =  patientsUrl
                },
                new LinkModel
                {
                    Verb = Constants.POST_VERB,
                    Rel = Constants.CREATE_REL,
                    Href =  patientsUrl
                },
                new LinkModel
                {
                    Verb = Constants.PUT_VERB,
                    Rel = Constants.UPDATE_REL,
                    Href =  patientsUrl
                },
                new LinkModel
                {
                    Verb = Constants.DELETE_VERB,
                    Rel = Constants.DELETE_REL,
                    Href =  patientsUrl
                }
            };

            return links;
        }

        /// <summary>
        /// Creates a ResponseModel in order to inform the client the status of the operations
        /// </summary>
        /// <param name="status">Status</param>
        /// <param name="message">Message</param>
        /// <returns>ResponseModel</returns>
        public static ResponseModel CreateResponseModel(int status, string message, dynamic data = null, long? total = null)
        {
            return new ResponseModel {
                Status = status,
                Message = message,
                Data = data,
                Total = total
            };
        }

        /// <summary>
        /// Creates a response with ok status
        /// </summary>
        /// <param name="request"></param>
        /// <returns>HttpResponseMessage(200)</returns>
        public static HttpResponseMessage CreateOkStatus(HttpRequestMessage request)
        {
            var response = request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

        /// <summary>
        /// Creates a response with created status
        /// </summary>
        /// <param name="request"></param>
        /// <returns>HttpResponseMessage(201)</returns>
        public static HttpResponseMessage CreateCreatedStatus(HttpRequestMessage request)
        {
            var response = request.CreateResponse(HttpStatusCode.Created);
            return response;
        }

        /// <summary>
        /// Creates a response with an internal server error status code
        /// </summary>
        /// <param name="request">Current Request</param>
        /// <param name="ex">Thrown Exception</param>
        /// <returns>HttpResponseMessage(500)</returns>
        public static HttpResponseMessage CreateServerError(HttpRequestMessage request)
        {
            var response = request.CreateResponse(HttpStatusCode.InternalServerError);
            return response;
        }

        /// <summary>
        /// Creates a response with a not found status code
        /// </summary>
        /// <param name="request">Current Request</param>
        /// <returns>HttpResponseMessage(404)</returns>
        public static HttpResponseMessage CreateNotFoundError(HttpRequestMessage request)
        {
            var response = request.CreateResponse(HttpStatusCode.NotFound);
            return response;
        }

        /// <summary>
        /// Creates a response with a bad request status code
        /// </summary>
        /// <param name="request">Current Request</param>
        /// <returns>HttpResponseMessage(400)</returns>
        public static HttpResponseMessage CreateBadRequestError(HttpRequestMessage request)
        {
            var response = request.CreateResponse(HttpStatusCode.BadRequest);
            return response;
        }
    }
}