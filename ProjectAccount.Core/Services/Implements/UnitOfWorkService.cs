using ProjectAccount.Core.Data.Repositories;

namespace ProjectAccount.Core.Services.Implements
{
    public class UnitOfWorkService : IUnitOfWorkService
    {
        private readonly IUnitOfWorkRepository unitOfWorkRepository;

        public UnitOfWorkService(IUnitOfWorkRepository unitOfWorkRepository)
        {
            this.unitOfWorkRepository = unitOfWorkRepository;
        }

        public IUnitOfWorkRepository GetInstance()
        {
            return this.unitOfWorkRepository;
        }

    }
}
