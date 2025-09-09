using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class CE_Transferencia
    {
        public int IdTransferencia { get; set; }
        public CE_CuentaBancaria IdCuentaOrigen { get; set; }
        public CE_CuentaBancaria IdCuentaDestino { get; set; }
        public decimal Monto { get; set; }
    }
}
