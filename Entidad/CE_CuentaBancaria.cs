using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class CE_CuentaBancaria
    {
        public int IdCuentaBancaria { get; set; }
        public CE_Cliente IdCliente { get; set; }
        public string NumeroCuenta { get; set; }
        public decimal Saldo { get; set; }
        public bool Estado { get; set; }
    }
}
