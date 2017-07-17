using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyFavoriteDentist.Models
{
    public class PatientModel
    {
        public int PatientId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime LastVisit { get; set; }
        public DateTime NextVisit { get; set; }
        public IEnumerable<TreatmentModel> Treatments { get; set; }
        public IEnumerable<LinkModel> Links { get; set; }
    }
}