using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Entidad
{
    public class CE_CuentaBancaria
    {
        public int IdCuenta { get; set; }
        public int IdCliente { get; set; }
        [Required(ErrorMessage = "El campo Propetario es requerido")]
        public string Propietario { get; set; }
        [Required(ErrorMessage = "El campo Tipo de Cuenta es requerido")]
        public string TipoCuenta { get; set; }
        public string NumeroCuenta { get; set; }
        [Required(ErrorMessage = "El campo Saldo es requerido")]
        [Range(0, double.MaxValue, ErrorMessage = "El saldo debe ser mayor o igual a 0")]
        public decimal Saldo { get; set; }
        [Required(ErrorMessage = "El campo Estado es requerido")]
        public bool Estado { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
