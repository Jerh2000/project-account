using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ProjectAccount.Core.Data.Models
{
    public class Tercero
    {
        public decimal Id { get; set; }
        public string Codigo { get; set; }
        public string Nit { get; set; }
        public string DV { get; set; }
        public string TipoDocumento { get; set; }
        public int TipoPersona { get; set; }
        public string Nombre { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public string Email { get; set; }
        public string Barrio { get; set; }
        public string Direccion { get; set; }
        public string Usuario { get; set; }
        public DateTime FechaServer { get; set; }
        public string UsuarioEdit { get; set; }
        public DateTime FechaServerEdit { get; set; }
        public string Estacion { get; set; }
    }
}
