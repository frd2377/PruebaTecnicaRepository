using System;
using System.Collections.Generic;

namespace RegistroTransacciones.Models;

public partial class Transaccion
{
    public int TransaccionId { get; set; }

    public DateTime Fecha { get; set; }

    public string TipoTransaccion { get; set; } = null!;

    public int ProductoId { get; set; }

    public int Cantidad { get; set; }

    public decimal? PrecioUnitario { get; set; }

    public decimal? PrecioTotal { get; set; }

    public string? Detalle { get; set; }
}
