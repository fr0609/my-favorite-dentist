using MyFavoriteDentist.DBContext;
using MyFavoriteDentist.Filters;
using MyFavoriteDentist.Utils;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyFavoriteDentist.Controllers.ApiControllers
{
    /// <summary>
    /// API Controller to manage the Treatments data.
    /// Basic authentication is required for this controller.
    /// </summary>
    [BasicAuthentication]
    public class TreatmentsController : BaseApiController
    {
        /// <summary>
        /// This method gets all the treatments
        /// </summary>
        /// <returns>
        /// Ok => Treatments Ok (200)
        /// Error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Get(int pageIndex, int pageSize)
        {
            HttpResponseMessage response;
            try
            {
                var treatments = CRUD.GetTreatments(_dbContext, pageIndex, pageSize);
                response = Utilities.CreateOkStatus(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Success, Constants.SUCCESS, treatments));
            }
            catch (Exception ex)
            {
                response = Utilities.CreateServerError(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, ex.StackTrace));
            }
        }

        /// <summary>
        /// This method gets a single treatment
        /// </summary>
        /// <returns>
        /// If the treatment exists => Treatment Ok (200)
        /// If the treatment doesn't exist => Not Found (404)
        /// If error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Get(int id)
        {
            HttpResponseMessage response;
            try
            {
                var treatment = CRUD.GetTreatment(_dbContext, id);

                if (treatment == null)
                {
                    response = Utilities.CreateNotFoundError(Request);
                    return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, Constants.NOT_FOUND));
                }

                response = Utilities.CreateOkStatus(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Success, Constants.SUCCESS, treatment));
            }
            catch (Exception ex)
            {
                response = Utilities.CreateServerError(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, ex.StackTrace));
            }
        }

        /// <summary>
        /// This method creates a new treatment
        /// </summary>
        /// <returns>
        /// Ok => Created (201)
        /// Error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Post([FromBody]Treatment treatment)
        {
            HttpResponseMessage response;
            try
            {
                var patient = CRUD.CheckPatient(_dbContext, treatment.PatientId);

                if (patient == null)
                {
                    response = Utilities.CreateBadRequestError(Request);
                    return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, Constants.WRONG_PATIENT_ID));
                }

                treatment.Patient = patient;
                _dbContext.Treatments.Add(treatment);

                response = Utilities.CreateCreatedStatus(Request);
                _dbContext.SaveChanges();
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Success, Constants.SUCCESS));
            }
            catch (Exception ex)
            {
                response = Utilities.CreateServerError(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, ex.StackTrace));
            }
        }

        /// <summary>
        /// This method updates a treatment
        /// </summary>
        /// <returns>
        /// If the treatment exists => Ok (200)
        /// If the treatment doesn't exist => Not Found (404)
        /// If error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Put(int id, [FromBody]Treatment treatment)
        {
            HttpResponseMessage response;
            try
            {
                var treatmentFromDB = CRUD.CheckTreatment(_dbContext, id);

                if (treatmentFromDB == null)
                {
                    response = Utilities.CreateNotFoundError(Request);
                    return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, Constants.NOT_FOUND));
                }

                treatmentFromDB.StartDate = treatment.StartDate;
                treatmentFromDB.EndDate = treatment.EndDate;
                treatmentFromDB.Price = treatment.Price;
                treatmentFromDB.Detail = treatment.Detail;

                response = Utilities.CreateOkStatus(Request);
                _dbContext.SaveChanges();
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Success, Constants.SUCCESS));
            }
            catch (Exception ex)
            {
                response = Utilities.CreateServerError(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, ex.StackTrace));
            }
        }

        /// <summary>
        /// This method deletes a treatment
        /// </summary>
        /// If the treatment exists => Ok(200)
        /// If the treatment doesn't exist => Not Found (404)
        /// If error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Delete(int id)
        {
            HttpResponseMessage response;
            try
            {
                var treatment = CRUD.GetTreatment(_dbContext, id);

                if (treatment == null)
                {
                    response = Utilities.CreateNotFoundError(Request);
                    return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, Constants.NOT_FOUND));
                }

                _dbContext.Treatments.Remove(_dbContext.Treatments.FirstOrDefault(x => x.TreatmentId == id));

                response = Utilities.CreateOkStatus(Request);
                _dbContext.SaveChanges();
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Success, Constants.SUCCESS));
            }
            catch (Exception ex)
            {
                response = Utilities.CreateServerError(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, ex.StackTrace));
            }
        }
    }
}
