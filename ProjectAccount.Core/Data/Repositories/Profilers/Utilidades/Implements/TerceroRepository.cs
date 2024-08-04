using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ProjectAccount.Core.Data.Models;
using ProjectAccount.Core.Data.Models.Queries.Contabilidad;
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
