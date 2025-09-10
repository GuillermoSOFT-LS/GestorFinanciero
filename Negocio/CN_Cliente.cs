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
    }
}
