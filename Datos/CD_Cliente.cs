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


        public List<CE_Cliente> SearchClient(string Documento)
        {
            List<CE_Cliente> lista = new List<CE_Cliente>();

            try
            {
                using (SqlConnection sqlcon = new SqlConnection(ConnectionDB.conn))
                using (SqlCommand cmd = new SqlCommand("SP_SEARCH_CLIENTES", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("Documento", Documento);

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



        public int InsertClient(CE_Cliente cliente)
        {
            int resultado;
            try
            {
                using(SqlConnection sqlcon = new SqlConnection(ConnectionDB.conn))
                using (SqlCommand cmd = new SqlCommand("SP_INSERT_CLIENT", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Nombre", cliente.Nombre);
                    cmd.Parameters.AddWithValue("@Documento", cliente.Documento);
                    cmd.Parameters.AddWithValue("@Correo", cliente.Correo);
                    cmd.Parameters.AddWithValue("@Telefono", cliente.Telefono);
                    cmd.Parameters.AddWithValue("@Estado", cliente.Estado);
                    sqlcon.Open();
                    resultado = cmd.ExecuteNonQuery();
                    sqlcon.Close();
                }
            }
            catch (Exception)
            {
                throw;
            }
            return resultado;
        }

        public int Update(CE_Cliente cliente)
        {
            int resultado;
            try
            {
                using(SqlConnection sqlcon = new SqlConnection(ConnectionDB.conn))
                    using(SqlCommand cmd = new SqlCommand("SP_UPDATE_CLIENTE", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Nombre", cliente.Nombre);
                    cmd.Parameters.AddWithValue("@Documento", cliente.Documento);
                    cmd.Parameters.AddWithValue("@Correo", cliente.Correo);
                    cmd.Parameters.AddWithValue("@Telefono", cliente.Telefono);
                    cmd.Parameters.AddWithValue("@Estado", cliente.Estado);

                    sqlcon.Open();
                    resultado = cmd.ExecuteNonQuery();
                    sqlcon.Close();
                }
            }
            catch (Exception)
            {
                throw;
            }

            return resultado;


        }
    }
}
