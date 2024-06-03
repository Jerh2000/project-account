using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ProjectAccount.AppAccount.Web.Areas.Identity.Data;
using ProjectAccount.AppAccount.Web.Areas.Identity.Data.Repository;
using ProjectAccount.AppAccount.Web.Areas.Identity.Data.Repository.Implements;
using ProjectAccount.AppAccount.Web.Areas.Identity.Services;
using ProjectAccount.AppAccount.Web.Areas.Identity.Services.Implements;
using ProjectAccount.Core.Data;
using ProjectAccount.Core.Data.Repositories;
using ProjectAccount.Core.Data.Repositories.Implements;
using ProjectAccount.Core.Services;
using ProjectAccount.Core.Services.Implements;
using System;

namespace ProjectAccount.AppAccount.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Configuracion de la conexion
            services.AddHttpContextAccessor();
            services.AddDbContext<ProjectAccountContext>(Options =>
            {
                Options.UseSqlServer(Configuration.GetConnectionString("GLSELFSERVICE_USERAPP"));
                Options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });

            services.AddDbContext<UserDataContext>(Options =>
                Options.UseSqlServer(Configuration.GetConnectionString("GLSELFSERVICE_USERAPP")));

            services.AddDefaultIdentity<ApplicationUser>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
                options.User.RequireUniqueEmail = true;

                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
                options.Password.RequiredUniqueChars = 0;
            }).AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<UserDataContext>();

            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Identity/Account/Login2";
            });

            #region Repositories

            services.AddScoped<IUnitOfWorkRepository, UnitOfWorkRepository>();

            #endregion Repositories

            #region Services

            services.AddScoped<IUnitOfWorkService, UnitOfWorkService>();

            #endregion Services

            #region Resources



            #endregion Resources

            #region Others

            services.AddScoped<IGenericRepositoryIdentity, GenericRepositoryIdentity>();
            services.AddScoped<IGenericServiceIdentity, GenericServiceIdentity>();

            #endregion Others

            // AutoMapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            // --------------------------------------------------------
            services.AddLogging();
            services.AddControllersWithViews();
            services.AddRazorPages();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Home}/{id?}");

                endpoints.MapRazorPages();
            });

            //Carpeta de los archivos para convertir reportes a PDF
            Rotativa.AspNetCore.RotativaConfiguration.Setup(env.WebRootPath, "../Rotativa");
        }
    }
}