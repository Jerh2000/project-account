using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjectAccount.AppAccount.Web.Areas.Identity.Data;
using ProjectAccount.Core.Data;
using ProjectAccount.Core.Services;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ProjectAccount.AppAccount.Web.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        #region UserManager

        private readonly UserManager<ApplicationUser> userManager;

        #endregion UserManager

        #region Services

        private readonly string KeyConnection;
        private IUnitOfWorkService unitOfWorkService;

        #endregion Services

        #region Others

        private readonly ILogger<HomeController> logger;
        private readonly IHttpContextAccessor contextAccessor;

        #endregion Others

        #region Constructor

        public HomeController
        (
            UserManager<ApplicationUser> userManager,
            ILogger<HomeController> logger,
            IHttpContextAccessor contextAccessor,
            IUnitOfWorkService unitOfWorkService
        )
        {
            this.userManager = userManager;

            this.logger = logger;
            this.contextAccessor = contextAccessor;
            this.unitOfWorkService = unitOfWorkService;

            ConnectionTools.SetKeyConnectionStringDirect(SessionHelper.GetValue(this.contextAccessor.HttpContext.User, "KeyConnection"));
            KeyConnection = SessionHelper.GetValue(this.contextAccessor.HttpContext.User, "KeyConnection");
        }

        #endregion Constructor

        #region ActionMethods

        [Authorize]
        public async Task<IActionResult> Home()
        {
            return View();
        }

        public async Task<IActionResult> Index()
        {

            var list = await unitOfWorkService.GetInstance().ContabilidadRepository.GetAllContabilidad(KeyConnection);

            return View();

        }


        #endregion ActionMethods
    }
}

//CASE MODELO
public class Porcentajes
{
    [JsonPropertyName("porcentaje")]
    public double Porcentaje;

    [JsonPropertyName("cantidad")]
    public int Cantidad;
}