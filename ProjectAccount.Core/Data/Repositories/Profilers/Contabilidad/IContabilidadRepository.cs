using ProjectAccount.Core.Data.Models.Queries.Contabilidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectAccount.Core.Data.Repositories.Profilers.Contabilidad
{
    public interface IContabilidadRepository
    {
        Task<IEnumerable<Consultas>> GetAllContabilidad(string KeyConnection);
    }
}
