using Microsoft.Extensions.Configuration;

namespace ProjectAccount.Core.Data.Repositories.Implements
{
    public class UnitOfWorkRepository: IUnitOfWorkRepository
    {
        private readonly ProjectAccountContext Context;
        private readonly IConfiguration configuration;

        public UnitOfWorkRepository(ProjectAccountContext Context, IConfiguration configuration)
        {
            this.Context = Context;
            this.configuration = configuration;
        }
    }
}
