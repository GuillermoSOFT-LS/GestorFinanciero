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
            objCapaDato.InsertarCuenta(cuenta);
            return cuenta;
        }

        public CE_Cliente BuscarClientePorDocumento(string documento)
        {
            return objCapaDato.GetClienteByDocumento(documento);
        }
    }
}
