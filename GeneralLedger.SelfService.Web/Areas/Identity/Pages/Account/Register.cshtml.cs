using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ProjectAccount.AppAccount.Web.Areas.Identity.Data;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAccount.AppAccount.Web.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private IConfiguration Configuration => new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
          .AddJsonFile("appsettings.json")
          .Build();

        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;
        private readonly IMapper mapper;

        public RegisterModel
        (
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
            _emailSender = emailSender;
            mapper = mapper;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "Este dato es requerido.")]
            [EmailAddress(ErrorMessage = "Dirección de correo inválida.")]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Este dato es requerido.")]
            [StringLength(100, ErrorMessage = "La contraseña debe contener mínimo {2} y máximo {1} caracteres.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Contraseña")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirmar Contraseña")]
            [Compare("Password", ErrorMessage = "La contraseña y su confirmación no son iguales.")]
            public string ConfirmPassword { get; set; }

            [Required(ErrorMessage = "Este dato es requerido.")]
            [RegularExpression("([0-9]+)", ErrorMessage = "Ingrese un NIT válido.")]
            [Display(Name = "Nit (sin DV)")]
            public string NitEmpresa { get; set; }

            [Required(ErrorMessage = "Este dato es requerido.")]
            [StringLength(39, ErrorMessage = "El nombre debe contener mínimo {2} y maximo {1} caracteres.", MinimumLength = 2)]
            public string PriNombre { get; set; }

            public string SegNombre { get; set; }

            [Required(ErrorMessage = "Este dato es requerido.")]
            [StringLength(39, ErrorMessage = "Los apellido deben contener mínimo {2} y maximo {1} caracteres.", MinimumLength = 2)]
            public string PriApellido { get; set; }

            public string SegApellido { get; set; }
            public int IdEmpresa { get; set; }

            [Required(ErrorMessage = "Este dato es requerido")]
            public string TipoDoc { get; set; }

            [Required(ErrorMessage = "Este dato es requerido")]
            [RegularExpression("([0-9]+)", ErrorMessage = "Ingrese No. Documento valido")]
            public string NroId { get; set; }

            [Required(ErrorMessage = "Este dato es requerido")]
            public string Ciudad { get; set; }

            public string CodCiudad { get; set; }

            [Required(ErrorMessage = "Este dato es requerido")]
            public string Direccion { get; set; }

            [Required(ErrorMessage = "Este dato es requerido")]
            [RegularExpression("([0-9]+)", ErrorMessage = "Ingrese número de celular valido")]
            public string NumeroCelular { get; set; }

            [RegularExpression("([0-9]+)", ErrorMessage = "Ingrese número de telefono valido")]
            public string NumeroTelefono { get; set; }
        }

        public async Task<IActionResult> OnGetAsync(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            //ViewData["Empresas"] = await empresaService.GetAll();
            //ViewData["Ciudades"] = profilerService.GetInstancia().ProCiudades.GetAll().OrderBy(c => c.Ciunom);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {


                return RedirectToPage("UserConfirmation", new { email = Input.Email, returnUrl });

            }
            else
            {

                return Page();
            }

            // If we got this far, something failed, redisplay form
            return RedirectToPage("Register");
        }


        private string BuildBodyEmail(string body, InputModel model)
        {
            body = body.Replace("<<TIPDOC>>", model.TipoDoc);
            body = body.Replace("<<NUMDOC>>", model.NroId);
            body = body.Replace("<<NOMBRE>>", $"{model.PriNombre} {model.SegNombre}");
            body = body.Replace("<<APELLIDOS>>", $"{model.PriApellido} {model.SegApellido}");
            body = body.Replace("<<CIUDAD>>", model.Ciudad);
            body = body.Replace("<<DIRECCION>>", model.Direccion);
            body = body.Replace("<<CELULAR>>", model.NumeroCelular);
            body = body.Replace("<<TELEFONO>>", model.NumeroTelefono);
            body = body.Replace("<<EMAIL>>", model.Email);
            return body;
        }
    }
}