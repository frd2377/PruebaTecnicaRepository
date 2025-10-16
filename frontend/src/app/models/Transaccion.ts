interface Transaccion {
  cantidad: number;
  detalle: string;
  fecha: Date;
  precioTotal: number;
  precioUnitario: number;
  productoId: number;
  tipoTransaccion: string;
  transaccionId: number;
}