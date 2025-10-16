using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GestionProductos.Models;

public partial class GestionproductosdbContext : DbContext
{
    public GestionproductosdbContext()
    {
    }

    public GestionproductosdbContext(DbContextOptions<GestionproductosdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Producto> Productos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.ProductoId).HasName("productos_pkey");

            entity.ToTable("productos");

            entity.Property(e => e.ProductoId).HasColumnName("producto_id");
            entity.Property(e => e.Categoria)
                .HasMaxLength(255)
                .HasColumnName("categoria");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .HasColumnName("descripcion");
            entity.Property(e => e.Imagen)
                .HasMaxLength(255)
                .HasColumnName("imagen");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasPrecision(10, 2)
                .HasColumnName("precio");
            entity.Property(e => e.Stock).HasColumnName("stock");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
