using Microsoft.AspNetCore.Mvc;
using ProjectAccount.Core.Data.Models.Inserts;
using ProjectAccount.Core.Data.Models.Updates;
using ProjectAccount.Core.Data.Repositories;
using System.Threading.Tasks;
using System;

namespace ProjectAccount.AppAccount.Web.Controllers
{
    public class ClienteController : Controller
    {
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;
        public ClienteController(IUnitOfWorkRepository _unitOfWorkRepository)
        {
            this._unitOfWorkRepository = _unitOfWorkRepository;
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public async Task<IActionResult> GetAllCliente(string conexion)
        {
            try
            {
                var cliente = await _unitOfWorkRepository.clienteRepository.GetAllCliente(conexion);
                return Json(new { result = true, msg = "", data = cliente });
            }
            catch
            {
                return Json(new { result = false, msg = "No se pudo consultar los clientes", data = "" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetClienteByCodigo(string conexion, string codigo)
        {
            try
            {
                var cliente = await _unitOfWorkRepository.clienteRepository.GetClienteByCodigo(codigo, conexion);
                return Json(new { result = true, msg = "", data = cliente });
            }
            catch
            {
                return Json(new { result = false, msg = "No se pudo consultar el cliente", data = "" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCliente([FromBody] ClienteInsert cliente)
        {
            try
            {
                var response = await _unitOfWorkRepository.clienteRepository.CreateCliente(cliente);

                return Json(new { result = response.Codigo.Equals("0"), msg = response.Mensaje, data = response });

            }
            catch (Exception ex)
            {
                return Json(new { result = false, msg = "No se pudo crear el cliente: " + ex.Message, data = "" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateCliente([FromBody] ClienteUpdate cliente)
        {
            try
            {
                var response = await _unitOfWorkRepository.clienteRepository.UpdateCliente(cliente);

                return Json(new { result = response.Codigo.Equals("0"), msg = response.Mensaje, data = response });

            }
            catch (Exception ex)
            {
                return Json(new { result = false, msg = "No se pudo actualizar el cliente: " + ex.Message, data = "" });
            }
        }
    }
}
