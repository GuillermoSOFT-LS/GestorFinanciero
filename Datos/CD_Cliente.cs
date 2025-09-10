using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidad;

namespace Datos
{
    public class CD_Cliente
    {
        public List<CE_Cliente> GetAllClients()
        {
            List<CE_Cliente> lista = new List<CE_Cliente>();
            try
            {
                using (SqlConnection sqlcon = new SqlConnection(ConnectionDB.conn))
                using (SqlCommand cmd = new SqlCommand("SP_SELECT_CLIENTES", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    sqlcon.Open();

                    SqlDataReader sdr = cmd.ExecuteReader();

                    while (sdr.Read())
                    {
                        lista.Add(new CE_Cliente
                        {
                            IdCliente = Convert.ToInt32(sdr["IdCliente"]),
                            Nombre = sdr["Nombre"].ToString(),
                            Documento = sdr["Documento"].ToString(),
                            Correo = sdr["Correo"].ToString(),
                            Telefono = sdr["Telefono"].ToString(),
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
    }
}
