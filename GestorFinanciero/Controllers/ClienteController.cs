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

        [HttpPost]
        public JsonResult Insert(CE_Cliente cliente)
        {
            var resultado = Cliente.InsertClient(cliente);
            return Json(new { success = resultado > 0 });
        }

        public JsonResult SelectClientDocument(string Documento)
        {
            List<CE_Cliente> lista = new List<CE_Cliente>();
            lista = Cliente.SearchClient(Documento);
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(CE_Cliente cliente)
        {
            try
            {
                var resultado = Cliente.UpdateClient(cliente);
                return Json(new { success = resultado > 0 });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        public JsonResult Remove(int id)
        {
            try
            {
                var resultado = Cliente.RemoveClient(id);
                return Json(new { success = resultado > 0 });
            }
            catch(Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            
        }

    }
}