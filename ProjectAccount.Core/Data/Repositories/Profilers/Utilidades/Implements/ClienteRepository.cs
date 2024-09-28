using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ProjectAccount.Core.Data.Models.Inserts;
using ProjectAccount.Core.Data.Models.Responses;
using ProjectAccount.Core.Data.Models.Updates;
using ProjectAccount.Core.Data.Models;
using ProjectAccount.Core.Data.Repositories.Implements;
using ProjectAccount.Core.Utils;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectAccount.Core.Data.Repositories.Profilers.Utilidades.Implements
{
    public class ClienteRepository : GenericRepository<Cliente>, IClienteRepository
    {
        private readonly ProjectAccountContext Context;
        private readonly IConfiguration configuration;

        public ClienteRepository(ProjectAccountContext Context, IConfiguration configuration) : base(Context)
        {
            this.Context = Context;
            this.configuration = configuration;
        }

        public async Task<ResponseInserts> CreateCliente(ClienteInsert clienteInsert)
        {
            ResponseInserts responseInserts = new ResponseInserts();

            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Operation", Value = "Insert"},
                new SqlParameter { ParameterName = "@Nit", Value = clienteInsert.Nit},
                new SqlParameter { ParameterName = "@DV", Value = clienteInsert.DV},
                new SqlParameter { ParameterName = "@TipoDocumento", Value = clienteInsert.TipoDocumento},
                new SqlParameter { ParameterName = "@TipoPersona", Value = clienteInsert.TipoPersona},
                new SqlParameter { ParameterName = "@Nombre", Value = clienteInsert.Nombre},
                new SqlParameter { ParameterName = "@PrimerNombre", Value = clienteInsert.PrimerNombre},
                new SqlParameter { ParameterName = "@SegundoNombre", Value = clienteInsert.SegundoNombre},
                new SqlParameter { ParameterName = "@PrimerApellido", Value = clienteInsert.PrimerApellido},
                new SqlParameter { ParameterName = "@SegundoApellido", Value = clienteInsert.SegundoApellido},
                new SqlParameter { ParameterName = "@Telefono", Value = clienteInsert.Telefono},
                new SqlParameter { ParameterName = "@Celular", Value = clienteInsert.Celular},
                new SqlParameter { ParameterName = "@Email", Value = clienteInsert.Email,},
                new SqlParameter { ParameterName = "@Barrio", Value = clienteInsert.Barrio},
                new SqlParameter { ParameterName = "@Direccion", Value = clienteInsert.Direccion},
                new SqlParameter { ParameterName = "@Usuario", Value = clienteInsert.Usuario},
            };

            var connection = new SqlConnection(configuration.GetConnectionString(clienteInsert.Conexion));

            var query = await ExecuteQueryDataTable("SP_Cliente", "datos", CommandType.StoredProcedure, parms.ToArray(), connection);

            responseInserts = Functions.ConvertToEntity<ResponseInserts>(query);

            return responseInserts;

        }

        public async Task<ResponseInserts> UpdateCliente(ClienteUpdate clienteUpdate)
        {
            ResponseInserts responseInserts = new ResponseInserts();

            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Operation", Value = "Update"},
                new SqlParameter { ParameterName = "@Codigo", Value = clienteUpdate.Codigo},
                new SqlParameter { ParameterName = "@Nit", Value = clienteUpdate.Nit},
                new SqlParameter { ParameterName = "@DV", Value = clienteUpdate.DV},
                new SqlParameter { ParameterName = "@TipoDocumento", Value = clienteUpdate.TipoDocumento},
                new SqlParameter { ParameterName = "@TipoPersona", Value = clienteUpdate.TipoPersona},
                new SqlParameter { ParameterName = "@Nombre", Value = clienteUpdate.Nombre},
                new SqlParameter { ParameterName = "@PrimerNombre", Value = clienteUpdate.PrimerNombre},
                new SqlParameter { ParameterName = "@SegundoNombre", Value = clienteUpdate.SegundoNombre},
                new SqlParameter { ParameterName = "@PrimerApellido", Value = clienteUpdate.PrimerApellido},
                new SqlParameter { ParameterName = "@SegundoApellido", Value = clienteUpdate.SegundoApellido},
                new SqlParameter { ParameterName = "@Telefono", Value = clienteUpdate.Telefono},
                new SqlParameter { ParameterName = "@Celular", Value = clienteUpdate.Celular},
                new SqlParameter { ParameterName = "@Email", Value = clienteUpdate.Email,},
                new SqlParameter { ParameterName = "@Barrio", Value = clienteUpdate.Barrio},
                new SqlParameter { ParameterName = "@Direccion", Value = clienteUpdate.Direccion},
                new SqlParameter { ParameterName = "@Usuario", Value = clienteUpdate.UsuarioEdit},
            };

            var connection = new SqlConnection(configuration.GetConnectionString(clienteUpdate.Conexion));

            var query = await ExecuteQueryDataTable("SP_Cliente", "datos", CommandType.StoredProcedure, parms.ToArray(), connection);

            responseInserts = Functions.ConvertToEntity<ResponseInserts>(query);

            return responseInserts;

        }

        public async Task<IEnumerable<Cliente>> GetAllCliente(string KeyConnection)
        {
            List<Cliente> clientes = new List<Cliente>();

            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Operation", Value = "GetAll"},
            };

            var connection = new SqlConnection(configuration.GetConnectionString(KeyConnection));

            var query = await ExecuteQueryDataTable("SP_Cliente", "datos", CommandType.StoredProcedure, parms.ToArray(), connection);

            clientes = Functions.ConvertToList<Cliente>(query);

            return clientes;
        }

        public async Task<Cliente> GetClienteByCodigo(string codigo, string KeyConnection)
        {
            Cliente clientes = new Cliente();

            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Operation", Value = "GetAll"},
                new SqlParameter { ParameterName = "@Codigo", Value = codigo},
            };

            var connection = new SqlConnection(configuration.GetConnectionString(KeyConnection));

            var query = await ExecuteQueryDataTable("SP_Cliente", "datos", CommandType.StoredProcedure, parms.ToArray(), connection);

            clientes = Functions.ConvertToEntity<Cliente>(query);

            return clientes;
        }
    }
}
