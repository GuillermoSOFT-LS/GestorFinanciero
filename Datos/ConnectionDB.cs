using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace Datos
{
    internal class ConnectionDB
    {
        public static string conn = ConfigurationManager.ConnectionStrings["connectionDB"].ConnectionString;
    }
}
