using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RegistroTransacciones.Models;

public partial class RegistrotransaccionesdbContext : DbContext
{
    public RegistrotransaccionesdbContext()
    {
    }

    public RegistrotransaccionesdbContext(DbContextOptions<RegistrotransaccionesdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Transaccion> Transaccions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transaccion>(entity =>
        {
            entity.HasKey(e => e.TransaccionId).HasName("transaccion_pkey");

            entity.ToTable("transaccion");

            entity.Property(e => e.TransaccionId).HasColumnName("transaccion_id");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Detalle)
                .HasMaxLength(255)
                .HasColumnName("detalle");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.PrecioTotal)
                .HasPrecision(10, 2)
                .HasColumnName("precio_total");
            entity.Property(e => e.PrecioUnitario)
                .HasPrecision(10, 2)
                .HasColumnName("precio_unitario");
            entity.Property(e => e.ProductoId).HasColumnName("producto_id");
            entity.Property(e => e.TipoTransaccion)
                .HasMaxLength(255)
                .HasColumnName("tipo_transaccion");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
