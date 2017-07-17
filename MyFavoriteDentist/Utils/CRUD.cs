using MyFavoriteDentist.DBContext;
using MyFavoriteDentist.DBContext.Interfaces;
using MyFavoriteDentist.Models;
using System.Collections.Generic;
using System.Linq;

namespace MyFavoriteDentist.Utils
{
    public static class CRUD
    {
        /// <summary>
        /// This method retrieves 'X' amount of patients from the database
        /// </summary>
        /// <param name="_dbContext">DB Context</param>
        /// <param name="pageIndex">Page Index</param>
        /// <param name="pageSize">Page Size</param>
        /// <returns>Chunk of patients</returns>
        public static IEnumerable<PatientModel> GetPatients(IMyFavoriteDentistEntities _dbContext, int pageIndex, int pageSize)
        {
            var patients =  (from p in _dbContext.Patients.AsEnumerable()
                            select new PatientModel
                            {
                                PatientId = p.PatientId,
                                Name = p.Name,
                                LastName = p.LastName,
                                Age = p.Age,
                                Phone = p.Phone,
                                Email = p.Email,
                                LastVisit = p.LastVisit,
                                NextVisit = p.NextVisit,
                                Links = Utilities.GetHypermedia(p.PatientId, Constants.PATIENTS_URL),
                                Treatments = from t in p.Treatments.AsEnumerable()
                                             select new TreatmentModel
                                             {
                                                 TreatmentId = t.TreatmentId,
                                                 StartDate = t.StartDate,
                                                 EndDate = t.EndDate,
                                                 Price = t.Price,
                                                 Detail = t.Detail,
                                                 Links = Utilities.GetHypermedia(t.TreatmentId, Constants.TREATMENTS_URL)
                                             }
                            }).Skip(pageIndex * pageSize).Take(pageSize);

            return patients;
        }

        /// <summary>
        /// This method retrieves a single patient from the database
        /// </summary>
        /// <param name="_dbContext">DB Context</param>
        /// <param name="patientId">Patient ID</param>
        /// <returns>Patient</returns>
        public static PatientModel GetPatient(IMyFavoriteDentistEntities _dbContext, int patientId)
        {
            var patient = from p in _dbContext.Patients.AsEnumerable()
                          where p.PatientId == patientId
                          select new PatientModel
                          {
                              PatientId = p.PatientId,
                              Name = p.Name,
                              LastName = p.LastName,
                              Age = p.Age,
                              Phone = p.Phone,
                              Email = p.Email,
                              LastVisit = p.LastVisit,
                              NextVisit = p.NextVisit,
                              Links = Utilities.GetHypermedia(p.PatientId, Constants.PATIENTS_URL),
                              Treatments = from t in p.Treatments.AsEnumerable()
                                           select new TreatmentModel
                                           {
                                               TreatmentId = t.TreatmentId,
                                               StartDate = t.StartDate,
                                               EndDate = t.EndDate,
                                               Price = t.Price,
                                               Detail = t.Detail,
                                               Links = Utilities.GetHypermedia(t.TreatmentId, Constants.TREATMENTS_URL)
                                           }
                          };

            return patient.FirstOrDefault();
        }

        /// <summary>
        /// Checks if a patient exists in the database
        /// </summary>
        /// <param name="_dbContext">DB Context</param>
        /// <param name="patientId">Patient ID</param>
        /// <returns>
        /// True => Patient
        /// False => Null
        /// </returns>
        public static Patient CheckPatient(IMyFavoriteDentistEntities _dbContext, int patientId)
        {
            var patient = _dbContext.Patients.SingleOrDefault(p => p.PatientId == patientId);
            return (patient != null) ? patient : null;
        }

        /// <summary>
        /// Gets the patients total
        /// </summary>
        /// <param name="_dbContext">DB Context</param>
        /// <returns>Patients Total</returns>
        public static long GetPatientsTotal(IMyFavoriteDentistEntities _dbContext)
        {
            return (from p in _dbContext.Patients select p.PatientId).Count();
        }

        /// <summary>
        /// This method checks if an email already exists in the database
        /// </summary>
        /// <param name="_dbContext">DB Context</param>
        /// <param name="email">Email</param>
        /// <returns>
        /// True => Email exists
        /// False => Email doesn't exist
        /// </returns>
        public static bool EmailExists(IMyFavoriteDentistEntities _dbContext, string email)
        {
            var patient = _dbContext.Patients.SingleOrDefault(p => p.Email.Equals(email));
            return (patient != null) ? true : false;
        }

        /// <summary>
        /// This method gets 'X' amount of treatments
        /// </summary>
        /// <param name="_dbContext"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns>Chunk of treatments</returns>
        public static IEnumerable<TreatmentModel> GetTreatments(IMyFavoriteDentistEntities _dbContext, int pageIndex, int pageSize)
        {
            var treatments = (from t in _dbContext.Treatments.AsEnumerable()
                             select new TreatmentModel {
                                 TreatmentId = t.TreatmentId,
                                 StartDate = t.StartDate,
                                 EndDate = t.EndDate,
                                 Price = t.Price,
                                 Detail = t.Detail,
                                 Links = Utilities.GetHypermedia(t.TreatmentId, Constants.TREATMENTS_URL)
                             }).Skip(pageIndex * pageSize).Take(pageSize);

            return treatments;
        }

        /// <summary>
        /// This method retrieves a single treatment from the database
        /// </summary>
        /// <param name="_dbContext">DB Context</param>
        /// <param name="treatmentId">Treatment ID</param>
        /// <returns>Treatment</returns>
        public static TreatmentModel GetTreatment(IMyFavoriteDentistEntities _dbContext, int treatmentId)
        {
            var treatment = from t in _dbContext.Treatments.AsEnumerable()
                            where t.TreatmentId == treatmentId
                            select new TreatmentModel {
                                TreatmentId = t.TreatmentId,
                                StartDate = t.StartDate,
                                EndDate = t.EndDate,
                                Price = t.Price,
                                Detail = t.Detail,
                                Links = Utilities.GetHypermedia(t.TreatmentId, Constants.TREATMENTS_URL)
                            };

            return treatment.FirstOrDefault();
        }

        /// <summary>
        /// Checks if a treatment exists in the database
        /// </summary>
        /// <param name="_dbContext">DB Context</param>
        /// <param name="treatmentId">Treatment ID</param>
        /// <returns>
        /// True => Treatment
        /// False => Null
        /// </returns>
        public static Treatment CheckTreatment(IMyFavoriteDentistEntities _dbContext, int treatmentId)
        {
            var treatment = _dbContext.Treatments.SingleOrDefault(t => t.TreatmentId == treatmentId);
            return (treatment != null) ? treatment : null;
        }
    }
}