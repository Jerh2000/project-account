using Microsoft.AspNetCore.Mvc;
using ProjectAccount.Core.Data.Models;
using ProjectAccount.Core.Data.Models.Inserts;
using ProjectAccount.Core.Data.Models.Updates;
using ProjectAccount.Core.Data.Repositories;
using System;
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

        [HttpGet]
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

        [HttpPost]
        public async Task<IActionResult> CreateTercero([FromBody]TerceroInsert tercero)
        {
            try
            {
                var response = await _unitOfWorkRepository.terceroRepository.CrateTecero(tercero);

                return Json(new { result = response.Codigo.Equals("0"), msg = response.Mensaje, data = response });
                
            }
            catch(Exception ex)
            {
                return Json(new { result = false, msg = "No se pudo crear el tercero: " + ex.Message, data = "" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTercero([FromBody] TerceroUpdate tercero)
        {
            try
            {
                var response = await _unitOfWorkRepository.terceroRepository.UpdateTercero(tercero);

                return Json(new { result = response.Codigo.Equals("0"), msg = response.Mensaje, data = response });

            }
            catch (Exception ex)
            {
                return Json(new { result = false, msg = "No se pudo actualizar el tercero: " + ex.Message, data = "" });
            }
        }
    }
}
