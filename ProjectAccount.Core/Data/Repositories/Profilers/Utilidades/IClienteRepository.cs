using ProjectAccount.Core.Data.Models.Inserts;
using ProjectAccount.Core.Data.Models.Responses;
using ProjectAccount.Core.Data.Models.Updates;
using ProjectAccount.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectAccount.Core.Data.Repositories.Profilers.Utilidades
{
    public interface IClienteRepository : IGenericRepository<Cliente>
    {
        Task<IEnumerable<Cliente>> GetAllCliente(string KeyConnection);
        Task<Cliente> GetClienteByCodigo(string codigo, string KeyConnection);
        Task<ResponseInserts> CreateCliente(ClienteInsert clienteInsert);
        Task<ResponseInserts> UpdateCliente(ClienteUpdate clienteUpdate);
    }
}
