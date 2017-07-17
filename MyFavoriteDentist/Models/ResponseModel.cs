using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyFavoriteDentist.Models
{
    public class ResponseModel
    {
        public int Status { get; set; }
        public dynamic Message { get; set; }
        public dynamic Data { get; set; }
        public long? Total { get; set; }
    }
}