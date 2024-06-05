using ProjectAccount.Core.Data.Repositories.Profilers.Contabilidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectAccount.Core.Data.Repositories
{
    public interface IUnitOfWorkRepository
    {
        public IContabilidadRepository ContabilidadRepository { get; set; }
    }
}
