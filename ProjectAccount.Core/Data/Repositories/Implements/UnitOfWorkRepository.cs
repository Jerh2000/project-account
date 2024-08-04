using Microsoft.Extensions.Configuration;
using ProjectAccount.Core.Data.Repositories.Profilers.Utilidades;
using ProjectAccount.Core.Data.Repositories.Profilers.Utilidades.Implements;

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

            terceroRepository = new TerceroRepository(Context,configuration);
        }

        public ITerceroRepository terceroRepository { get; set; }
    }
}
