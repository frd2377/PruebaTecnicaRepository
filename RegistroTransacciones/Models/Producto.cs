namespace RegistroTransacciones.Models
{
    public partial class Producto
    {
        public int ProductoId { get; set; }

        public string Nombre { get; set; } = null!;

        public string Descripcion { get; set; } = null!;

        public string Categoria { get; set; } = null!;

        public string? Imagen { get; set; }

        public decimal Precio { get; set; }

        public int Stock { get; set; }
    }
}
