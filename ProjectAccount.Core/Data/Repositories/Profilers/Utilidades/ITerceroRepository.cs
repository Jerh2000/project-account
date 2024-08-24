using ProjectAccount.Core.Data.Models;
using ProjectAccount.Core.Data.Models.Inserts;
using ProjectAccount.Core.Data.Models.Queries.Contabilidad;
using ProjectAccount.Core.Data.Models.Responses;
using ProjectAccount.Core.Data.Models.Updates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectAccount.Core.Data.Repositories.Profilers.Utilidades
{
    public interface ITerceroRepository:IGenericRepository<Tercero>
    {
        Task<IEnumerable<Tercero>> GetAllTercero(string KeyConnection);
        Task<Tercero> GetTerceroByCodigo(string codigo, string KeyConnection);
        Task<ResponseInserts> CrateTecero(TerceroInsert terceroInsert);
        Task<ResponseInserts> UpdateTercero(TerceroUpdate terceroUpdate);
    }
}
