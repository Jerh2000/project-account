using Microsoft.AspNetCore.Mvc;
using ProjectAccount.Core.Data.Models;
using ProjectAccount.Core.Data.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectAccount.AppAccount.Web.Controllers
{
    public class TerceroController : Controller
    {
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;
        public TerceroController(IUnitOfWorkRepository _unitOfWorkRepository)
        {
            this._unitOfWorkRepository = _unitOfWorkRepository;
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public async Task<IActionResult> GetAllTercero(string conexion)
        {
            try
            {
                var tercero = await _unitOfWorkRepository.terceroRepository.GetAllTercero(conexion);
                return  Json(new {result = true,msg = "",data = tercero });
            }
            catch
            {
                return Json(new { result =false, msg = "No se pudo consultar los terceros", data = "" });
            }
        }

        public async Task<IActionResult> GetTerceroByCodigo(string conexion,string codigo)
        {
            try
            {
                var tercero = await _unitOfWorkRepository.terceroRepository.GetTerceroByCodigo(codigo, conexion);
                return Json(new { result = true, msg = "", data = tercero });
            }
            catch
            {
                return Json(new { result = false, msg = "No se pudo consultar el tercero", data = "" });
            }
        }
    }
}
