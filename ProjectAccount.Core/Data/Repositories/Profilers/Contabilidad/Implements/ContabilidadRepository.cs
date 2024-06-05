using Microsoft.Extensions.Configuration;
using ProjectAccount.Core.Data.Models.Queries.Contabilidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectAccount.Core.Data.Repositories.Profilers.Contabilidad.Implements
{
    public class ContabilidadRepository : IContabilidadRepository
    {
        private readonly ProjectAccountContext Context;
        private readonly IConfiguration configuration;

        public ContabilidadRepository(ProjectAccountContext Context, IConfiguration configuration)
        {
            this.Context = Context;
            this.configuration = configuration;
        }

        public Task<IEnumerable<Consultas>> GetAllContabilidad(string KeyConnection)
        {
            throw new NotImplementedException();
        }
    }
}
