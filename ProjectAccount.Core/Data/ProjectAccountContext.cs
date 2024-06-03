using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ProjectAccount.Core.Data
{
    public class ProjectAccountContext : DbContext
    {
        private IConfiguration Configuration => new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json")
           .Build();

        public ProjectAccountContext(DbContextOptions<ProjectAccountContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
            optionsBuilder.EnableDetailedErrors();

            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("GLSELFSERVICE_USERAPP"));
        }
    }
}
