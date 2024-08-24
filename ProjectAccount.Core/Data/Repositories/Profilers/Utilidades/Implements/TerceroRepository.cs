using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ProjectAccount.Core.Data.Models;
using ProjectAccount.Core.Data.Models.Inserts;
using ProjectAccount.Core.Data.Models.Queries.Contabilidad;
using ProjectAccount.Core.Data.Models.Responses;
using ProjectAccount.Core.Data.Models.Updates;
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
    public class TerceroRepository : GenericRepository<Tercero>,ITerceroRepository
    {
        private readonly ProjectAccountContext Context;
        private readonly IConfiguration configuration;

        public TerceroRepository(ProjectAccountContext Context, IConfiguration configuration):base (Context)
        {
            this.Context = Context;
            this.configuration = configuration;
        }

        public async Task<ResponseInserts> CrateTecero(TerceroInsert terceroInsert)
        {
           ResponseInserts responseInserts = new ResponseInserts();

            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Operation", Value = "Insert"},
                new SqlParameter { ParameterName = "@Nit", Value = terceroInsert.Nit},
                new SqlParameter { ParameterName = "@DV", Value = terceroInsert.DV},
                new SqlParameter { ParameterName = "@TipoDocumento", Value = terceroInsert.TipoDocumento},
                new SqlParameter { ParameterName = "@TipoPersona", Value = terceroInsert.TipoPersona},
                new SqlParameter { ParameterName = "@Nombre", Value = terceroInsert.Nombre},
                new SqlParameter { ParameterName = "@PrimerNombre", Value = terceroInsert.PrimerNombre},
                new SqlParameter { ParameterName = "@SegundoNombre", Value = terceroInsert.SegundoNombre},
                new SqlParameter { ParameterName = "@PrimerApellido", Value = terceroInsert.PrimerApellido},
                new SqlParameter { ParameterName = "@SegundoApellido", Value = terceroInsert.SegundoApellido},
                new SqlParameter { ParameterName = "@Telefono", Value = terceroInsert.Telefono},
                new SqlParameter { ParameterName = "@Celular", Value = terceroInsert.Celular},
                new SqlParameter { ParameterName = "@Email", Value = terceroInsert.Email,},
                new SqlParameter { ParameterName = "@Barrio", Value = terceroInsert.Barrio},
                new SqlParameter { ParameterName = "@Direccion", Value = terceroInsert.Direccion},
                new SqlParameter { ParameterName = "@Usuario", Value = terceroInsert.Usuario},
            };

            var connection = new SqlConnection(configuration.GetConnectionString(terceroInsert.Conexion));

            var query = await ExecuteQueryDataTable("SP_Tercero", "datos", CommandType.StoredProcedure, parms.ToArray(), connection);

            responseInserts = Functions.ConvertToEntity<ResponseInserts>(query);

            return responseInserts;

        }

        public async Task<ResponseInserts> UpdateTercero(TerceroUpdate terceroUpdate)
        {
            ResponseInserts responseInserts = new ResponseInserts();

            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Operation", Value = "Update"},
                new SqlParameter { ParameterName = "@Codigo", Value = terceroUpdate.Codigo},
                new SqlParameter { ParameterName = "@Nit", Value = terceroUpdate.Nit},
                new SqlParameter { ParameterName = "@DV", Value = terceroUpdate.DV},
                new SqlParameter { ParameterName = "@TipoDocumento", Value = terceroUpdate.TipoDocumento},
                new SqlParameter { ParameterName = "@TipoPersona", Value = terceroUpdate.TipoPersona},
                new SqlParameter { ParameterName = "@Nombre", Value = terceroUpdate.Nombre},
                new SqlParameter { ParameterName = "@PrimerNombre", Value = terceroUpdate.PrimerNombre},
                new SqlParameter { ParameterName = "@SegundoNombre", Value = terceroUpdate.SegundoNombre},
                new SqlParameter { ParameterName = "@PrimerApellido", Value = terceroUpdate.PrimerApellido},
                new SqlParameter { ParameterName = "@SegundoApellido", Value = terceroUpdate.SegundoApellido},
                new SqlParameter { ParameterName = "@Telefono", Value = terceroUpdate.Telefono},
                new SqlParameter { ParameterName = "@Celular", Value = terceroUpdate.Celular},
                new SqlParameter { ParameterName = "@Email", Value = terceroUpdate.Email,},
                new SqlParameter { ParameterName = "@Barrio", Value = terceroUpdate.Barrio},
                new SqlParameter { ParameterName = "@Direccion", Value = terceroUpdate.Direccion},
                new SqlParameter { ParameterName = "@Usuario", Value = terceroUpdate.UsuarioEdit},
            };

            var connection = new SqlConnection(configuration.GetConnectionString(terceroUpdate.Conexion));

            var query = await ExecuteQueryDataTable("SP_Tercero", "datos", CommandType.StoredProcedure, parms.ToArray(), connection);

            responseInserts = Functions.ConvertToEntity<ResponseInserts>(query);

            return responseInserts;

        }

        public async Task<IEnumerable<Tercero>> GetAllTercero(string KeyConnection)
        {
            List<Tercero> terceros = new List<Tercero>();

            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Operation", Value = "GetAll"},
            };

            var connection = new SqlConnection(configuration.GetConnectionString(KeyConnection));

            var query = await ExecuteQueryDataTable("SP_Tercero", "datos", CommandType.StoredProcedure, parms.ToArray(), connection);

            terceros = Functions.ConvertToList<Tercero>(query);

            return terceros;
        }

        public async Task<Tercero> GetTerceroByCodigo(string codigo,string KeyConnection)
        {
            Tercero terceros = new Tercero();

            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Operation", Value = "GetAll"},
                new SqlParameter { ParameterName = "@Codigo", Value = codigo},
            };

            var connection = new SqlConnection(configuration.GetConnectionString(KeyConnection));

            var query = await ExecuteQueryDataTable("SP_Tercero", "datos", CommandType.StoredProcedure, parms.ToArray(), connection);

            terceros = Functions.ConvertToEntity<Tercero>(query);

            return terceros;
        }
    }
}
