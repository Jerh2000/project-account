using ProjectAccount.Core.Data.Repositories.Profilers.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectAccount.Core.Data.Repositories
{
    public interface IUnitOfWorkRepository
    {
        public ITerceroRepository terceroRepository { get; set; }
    }
}
