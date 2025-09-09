using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class CE_Movimiento
    {
        public int IdMovimiento { get; set; }
        public CE_CuentaBancaria IdCuenta { get; set; }
        public string TipoMovimiento { get; set; }
        public decimal Monto { get; set; }
        public decimal SaldoRestante { get; set; }
        public string Descripcion { get; set; }
    }
}
