using ProjectAccount.AppAccount.Web.Areas.Identity.Data.Repository;
using ProjectAccount.AppAccount.Web.Areas.Identity.Services;

namespace ProjectAccount.AppAccount.Web.Areas.Identity.Services.Implements
{
    public class GenericServiceIdentity : IGenericServiceIdentity
    {
        private readonly IGenericRepositoryIdentity genericRepositoryIdentity;

        public GenericServiceIdentity(IGenericRepositoryIdentity genericRepositoryIdentity)
        {
            this.genericRepositoryIdentity = genericRepositoryIdentity;
        }

        public void ChangeConnectionString(string connectionString)
        {
            genericRepositoryIdentity.ChangeConnectionString(connectionString);
        }
    }
}