using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyFavoriteDentist.Models
{
    public class TreatmentModel
    {
        public int TreatmentId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Price { get; set; }
        public string Detail { get; set; }
        public IEnumerable<LinkModel> Links { get; set; }
    }
}