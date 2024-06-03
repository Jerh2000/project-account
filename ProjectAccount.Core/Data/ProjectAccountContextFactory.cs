using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ProjectAccount.Core.Data
{
    public class ProjectAccountContextFactory: IDesignTimeDbContextFactory<ProjectAccountContext>
    {
        private IConfiguration Configuration => new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json")
           .Build();

        public ProjectAccountContextFactory()
        {
        }

        public ProjectAccountContext CreateDbContext(string[] args)
        {
            var OptionsBuilder = new DbContextOptionsBuilder<ProjectAccountContext>();
            OptionsBuilder.UseSqlServer(Configuration.GetConnectionString("GLSELFSERVICE_KEY"));
            return new ProjectAccountContext(OptionsBuilder.Options);
        }
    }
}
