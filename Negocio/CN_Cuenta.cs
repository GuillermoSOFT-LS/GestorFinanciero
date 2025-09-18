using Datos;
using Entidad;
using System;
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

        public CE_Cliente BuscarClientePorDocumento(string documento)
        {
            return objCapaDato.GetClienteByDocumento(documento);
        }

        public string InsertarCuentaBancaria(CE_CuentaBancaria cuenta)
        {
            return objCapaDato.InsertarCuenta(cuenta);
        }
    }
}
