using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Datos;

namespace Negocio
{
    public class CN_Cliente
    {

        CD_Cliente objcd_cliente = new CD_Cliente();

        public List<CE_Cliente> GetAllClient()
        {
            return objcd_cliente.GetAllClients();
        }

        public int InsertClient(CE_Cliente cliente)
        {
            return objcd_cliente.InsertClient(cliente);
        }

        public List<CE_Cliente> SearchClient(string Documento)
        {
            return objcd_cliente.SearchClient(Documento);
        }
      
        public int UpdateClient(CE_Cliente cliente)
        {
            return objcd_cliente.Update(cliente);
        }

        public int RemoveClient(int id)
        {
            return objcd_cliente.DeleteClient(id);
        }

        public CE_Cliente GetClientById(int id)
        {
            return objcd_cliente.GetClientById(id);
        }

    }
}
