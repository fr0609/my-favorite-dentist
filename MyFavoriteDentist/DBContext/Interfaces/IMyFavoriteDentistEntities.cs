using System;
using System.Data.Entity;

namespace MyFavoriteDentist.DBContext.Interfaces
{
    public interface IMyFavoriteDentistEntities : IDisposable
    {
        DbSet<Patient> Patients { get; set; }
        DbSet<Treatment> Treatments { get; set; }
        int SaveChanges();
    }
}
