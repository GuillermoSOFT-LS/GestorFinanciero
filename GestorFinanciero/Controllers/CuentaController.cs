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
    }
}