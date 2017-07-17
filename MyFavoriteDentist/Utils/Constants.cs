using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyFavoriteDentist.Utils
{
    public static class Constants
    {
        #region Urls
        public const string PATIENTS_URL = "patients/";
        public const string TREATMENTS_URL = "treatments/";
        #endregion Urls

        #region Verbs
        public const string GET_VERB = "GET";
        public const string POST_VERB = "POST";
        public const string PUT_VERB = "PUT";
        public const string DELETE_VERB = "DELETE";
        #endregion Verbs

        #region Rel
        public const string SELF_REL = "self";
        public const string CREATE_REL = "create";
        public const string UPDATE_REL = "update";
        public const string DELETE_REL = "delete";
        #endregion Rel

        #region Messages
        public const string SUCCESS = "The operation was successful.";
        public const string EMAIL_EXISTS = "The email already exists in the database.";
        public const string NOT_FOUND = "The resource doesn't exist.";
        public const string WRONG_PATIENT_ID = "The Patient Id doesn't exist.";

        public enum Status {
            Fail,
            Success
        };

        #endregion Messages
    }
}