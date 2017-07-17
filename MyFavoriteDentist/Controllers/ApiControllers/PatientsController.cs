using MyFavoriteDentist.DBContext;
using MyFavoriteDentist.Filters;
using MyFavoriteDentist.Utils;
using System;
using System.Collections;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyFavoriteDentist.Controllers.ApiControllers
{
    /// <summary>
    /// API Controller to manage the Patients data.
    /// Basic authentication is required for this controller.
    /// </summary>
    [BasicAuthentication]
    public class PatientsController : BaseApiController
    {
        /// <summary>
        /// This method gets the patients (paginated)
        /// </summary>
        /// <param name="pageIndex">Page Index</param>
        /// <param name="pageSize">Page Size</param>
        /// <returns>
        /// Ok => Paginated Patients Ok (200)
        /// Error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Get(int pageIndex, int pageSize)
        {
            HttpResponseMessage response;
            try
            {
                long total = CRUD.GetPatientsTotal(_dbContext);
                var patients = CRUD.GetPatients(_dbContext, pageIndex, pageSize);
                response = Utilities.CreateOkStatus(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Success, Constants.SUCCESS, patients, total));
            }
            catch (Exception ex)
            {
                response = Utilities.CreateServerError(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, ex.StackTrace));
            }
        }

        /// <summary>
        /// This method gets a single patient
        /// </summary>
        /// <returns>
        /// If the patient exists => Patient Ok (200)
        /// If the patient doesn't exist => Not Found (404)
        /// If error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Get(int id)
        {
            HttpResponseMessage response;
            try
            {
                var patient = CRUD.GetPatient(_dbContext, id);

                if (patient == null)
                {
                    response = Utilities.CreateNotFoundError(Request);
                    return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, Constants.NOT_FOUND));
                }

                response = Utilities.CreateOkStatus(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Success, Constants.SUCCESS, patient));
            }
            catch (Exception ex)
            {
                response = Utilities.CreateServerError(Request);
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, ex.StackTrace));
            }
        }

        /// <summary>
        /// This method creates a new patient
        /// </summary>
        /// <returns>
        /// OK => Created (201)
        /// Error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Post([FromBody]Patient patient)
        {
            HttpResponseMessage response;
            try
            {
                bool emailExists = CRUD.EmailExists(_dbContext, patient.Email);
                if (emailExists)
                {
                    response = Utilities.CreateOkStatus(Request);
                    return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, Constants.EMAIL_EXISTS));
                }

                _dbContext.Patients.Add(patient);

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
        /// This method updates a patient
        /// </summary>
        /// <returns>
        /// If the patient exists => Ok (200)
        /// If the patient doesn't exist => Not Found (404)
        /// If error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Put(int id, [FromBody]Patient patient)
        {
            HttpResponseMessage response;
            try
            {
                var patientFromDB = CRUD.CheckPatient(_dbContext, id);

                if (patientFromDB == null)
                {
                    response = Utilities.CreateNotFoundError(Request);
                    return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, Constants.NOT_FOUND));
                }

                patientFromDB.Name = patient.Name;
                patientFromDB.LastName = patient.LastName;
                patientFromDB.Age = patient.Age;
                patientFromDB.Phone = patient.Phone;
                patientFromDB.Email = patient.Email;
                patientFromDB.LastVisit = patient.LastVisit;
                patientFromDB.NextVisit = patient.NextVisit;

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
        /// This method deletes a patient
        /// </summary>
        /// <returns>
        /// If the patient exists => Ok (200)
        /// If the patient doesn't exist => Not Found (404)
        /// If error => Internal Server Error (500)
        /// </returns>
        public HttpResponseMessage Delete(int id)
        {
            HttpResponseMessage response;
            try
            {
                var patient = CRUD.GetPatient(_dbContext, id);

                if (patient == null)
                {
                    response = Utilities.CreateNotFoundError(Request);
                    return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Fail, Constants.NOT_FOUND));
                }

                _dbContext.Patients.Remove(_dbContext.Patients.FirstOrDefault(x => x.PatientId == id));

                response = Utilities.CreateOkStatus(Request);
                _dbContext.SaveChanges();
                return ToJson(response, Utilities.CreateResponseModel((int)Constants.Status.Success, Constants.SUCCESS));
            }
            catch (Exception ex)
            {
                response = Utilities.CreateServerError(Request);
                return ToJson(response, ex.StackTrace);
            }
        }
    }
}
