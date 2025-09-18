using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GestorFinanciero.Controllers
{
    public class CuentaController : Controller
    {
        CN_Cuenta OBJCuenta = new CN_Cuenta();
        public ActionResult Index()
        {
            List<CE_CuentaBancaria> Lista = OBJCuenta.GetAllAccount();
            return View(Lista);
        }

        [HttpGet]
        public JsonResult SelectClientDocument(string documento)
        {
            CE_Cliente cliente = OBJCuenta.BuscarClientePorDocumento(documento);

            if (cliente != null)
            {
                return Json(new { success = true, idCliente = cliente.IdCliente, nombre = cliente.Nombre }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public JsonResult Insert(CE_CuentaBancaria model)
        {
            if (!ModelState.IsValid)
            {
                var errores = string.Join("<br/>", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));

                return Json(new { success = false, message = errores });
            }

            try
            {
                CN_Cuenta negocio = new CN_Cuenta();
                string numeroCuenta = negocio.InsertarCuentaBancaria(model);

                return Json(new
                {
                    success = true,
                    message = $"Cuenta registrada correctamente. Número de cuenta: {numeroCuenta}"
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

    }
}