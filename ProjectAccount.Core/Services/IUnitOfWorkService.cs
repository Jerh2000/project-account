using ProjectAccount.Core.Data.Repositories;

namespace ProjectAccount.Core.Services
{
    public interface IUnitOfWorkService
    {
        IUnitOfWorkRepository GetInstance();
    }
}
