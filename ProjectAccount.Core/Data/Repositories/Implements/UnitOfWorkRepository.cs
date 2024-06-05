using Microsoft.Extensions.Configuration;
using ProjectAccount.Core.Data.Repositories.Profilers.Contabilidad;
using ProjectAccount.Core.Data.Repositories.Profilers.Contabilidad.Implements;

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

            ContabilidadRepository = new ContabilidadRepository(Context,configuration);
        }

        public IContabilidadRepository ContabilidadRepository { get; set; }
    }
}
