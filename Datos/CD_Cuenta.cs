using Entidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
   public class CD_Cuenta
    {
        public List<CE_CuentaBancaria> GetAllAccounts()
        {
           List<CE_CuentaBancaria> lista = new List<CE_CuentaBancaria>();

            try
            {
                using (SqlConnection sqlcon = new SqlConnection(ConnectionDB.conn))
                    using (SqlCommand cmd = new SqlCommand("SP_SELECT_CUENTAS_BANCARIAS", sqlcon))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    sqlcon.Open();
                    SqlDataReader sdr = cmd.ExecuteReader();

                    while (sdr.Read())
                    {
                        lista.Add(new CE_CuentaBancaria
                        {
                            IdCliente = Convert.ToInt32(sdr["IdCliente"]),
                            IdCuenta = Convert.ToInt32(sdr["IdCuenta"]),
                            Propietario = sdr["Propietario"].ToString(),
                            TipoCuenta = sdr["TipoCuenta"].ToString(),
                            NumeroCuenta = sdr["NumeroCuenta"].ToString(),
                            Saldo = Convert.ToDecimal(sdr["Saldo"]),
                            Estado = Convert.ToBoolean(sdr["Estado"]),
                            FechaRegistro = Convert.ToDateTime(sdr["FechaRegistro"])
                        });
                    }

                    sqlcon.Close();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return lista;
        }
        public string InsertarCuenta(CE_CuentaBancaria cuenta, string connectionString)
        {
            string numeroGenerado = string.Empty;

            try
            {
                using (SqlConnection sqlcon = new SqlConnection(ConnectionDB.conn))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_InsertarCuentaBancaria", sqlcon))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdCliente", cuenta.IdCliente);
                        cmd.Parameters.AddWithValue("@Propietario", cuenta.Propietario);
                        cmd.Parameters.AddWithValue("@TipoCuenta", cuenta.TipoCuenta);
                        cmd.Parameters.AddWithValue("@Saldo", cuenta.Saldo);
                        sqlcon.Open();
                        SqlParameter outputNumero = new SqlParameter("@NuevoNumeroCuenta", SqlDbType.NVarChar, 20)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputNumero);                  
                        cmd.ExecuteNonQuery();
                        numeroGenerado = outputNumero.Value.ToString();
                        cuenta.NumeroCuenta = numeroGenerado;

                        sqlcon.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar la cuenta bancaria: " + ex.Message, ex);
            }

            return numeroGenerado;
        }
    }
}
