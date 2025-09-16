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
                
        public ActionResult Clientes()
        {
            List<CE_Cliente> lista = new List<CE_Cliente>();
            lista = Cliente.GetAllClient();
            return View(lista);
        }

        [HttpPost]
        public ActionResult Insert(CE_Cliente cliente, string Estado)
        {
            try
            {
                cliente.Estado = Estado == "1" ? true : false;
                var resultado = Cliente.InsertClient(cliente);
                return RedirectToAction("Clientes");
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult Remove(int id)
        {
            try
            {
                var resultado = Cliente.RemoveClient(id);
                return RedirectToAction("Clientes");
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }


        public ActionResult SelectClientDocument(string Documento)
        {
            List<CE_Cliente> lista = new List<CE_Cliente>();
            lista = Cliente.SearchClient(Documento);
            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult Update(CE_Cliente cliente, string Estado)
        {
            try
            {
                cliente.Estado = Estado == "1" ? true : false;
                var resultado = Cliente.UpdateClient(cliente);
                return RedirectToAction("Clientes");
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                return RedirectToAction("Clientes");
            }
        }

        public ActionResult GetClientById(int id)
        {
            var cliente = Cliente.GetClientById(id);
            return Json(cliente, JsonRequestBehavior.AllowGet);
        }

    }
}