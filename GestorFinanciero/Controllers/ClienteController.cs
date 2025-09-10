using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Entidad;
using Negocio;

namespace GestorFinanciero.Controllers
{
    public class ClienteController : Controller
    {
        CN_Cliente Cliente = new CN_Cliente();

        public JsonResult Index()
        {
            List<CE_Cliente> lista = new List<CE_Cliente>();
            lista = Cliente.GetAllClient();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Clientes()
        {
            return View();
        }
    }
}