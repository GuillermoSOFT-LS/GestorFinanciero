using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class CE_CuentaBancaria
    {
        public int IdCuenta { get; set; }
        public int IdCliente { get; set; }
        public string Propietario { get; set; }
        public string TipoCuenta { get; set; }
        public string NumeroCuenta { get; set; }
        public decimal Saldo { get; set; }
        public bool Estado { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
