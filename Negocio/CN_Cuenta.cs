using Datos;
using Entidad;
using System.Collections.Generic;

namespace Entidad
{
    public class CN_Cuenta
    {
        CD_Cuenta objCapaDato = new CD_Cuenta();

        // Obtener todas las cuentas
        public List<CE_CuentaBancaria> GetAllAccount()
        {
            return objCapaDato.GetAllAccounts();
        }

        // Registrar una nueva cuenta bancaria
        public CE_CuentaBancaria RegistrarCuenta(CE_CuentaBancaria cuenta)
        {
            // Llama al método de la capa de datos para insertar la cuenta
            objCapaDato.InsertarCuenta(cuenta, null); // El connectionString lo usa directamente CD_Cuenta
            // El NumeroCuenta ya queda asignado en la entidad
            return cuenta;
        }
    }
}
