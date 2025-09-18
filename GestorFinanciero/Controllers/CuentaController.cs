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
                return Json(new { success = true, nombre = cliente.Nombre }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}