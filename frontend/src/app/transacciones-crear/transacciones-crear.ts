import { Component, inject, signal } from '@angular/core';
import { ProductosService } from '../services/productos-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransaccionService } from '../services/transaccion-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transacciones-crear',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './transacciones-crear.html',
  styleUrl: './transacciones-crear.css'
})
export class TransaccionesCrear {

  private productoService = inject(ProductosService)
  private transaccionService = inject(TransaccionService)
  private router = inject(Router)

  productosList = signal<Producto[]>([])
  productoSeleccionado!: Producto;
  precioTotal: number = 0;

  transaccionForm = new FormGroup({
    cantidad: new FormControl(0, [Validators.min(1)]),
    detalle: new FormControl("", [Validators.nullValidator, Validators.required]),
    tipoTransaccion: new FormControl("")
  })

  constructor() {
    this.productoService.getProducts().subscribe({
      next: (values) => this.productosList.set(values),
      error: (error) => console.log(error)
    })
  }

  changeProducto(event: Event) {
    const productoId = (event.target as HTMLSelectElement).selectedOptions[0].id;
    
    this.productoSeleccionado = this.productosList().filter(p => p.productoId === parseInt(productoId))[0]
    console.log(this.productoSeleccionado)
  }

  changeCantidad(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    
    if (this.productoSeleccionado) {
      this.precioTotal = this.productoSeleccionado.precio * parseInt(value);
    }
  }

  guardar(){
    if (!this.productoSeleccionado || !this.transaccionForm.valid) {
      return
    }

    const transaccion: Transaccion = {
      transaccionId: 0,
      cantidad: this.transaccionForm.value.cantidad!,
      detalle: this.transaccionForm.value.detalle!,
      fecha: new Date(),
      precioTotal: 0,
      precioUnitario: 0,
      productoId: this.productoSeleccionado.productoId,
      tipoTransaccion: this.transaccionForm.value.tipoTransaccion!
    }

    this.transaccionService.postTransaccion(transaccion).subscribe({
      next: value => {
        this.router.navigateByUrl("transacciones")
      },
      error: error => console.log(error)
    })
  }

  cancelar(){
    this.router.navigateByUrl("transacciones")
  }
}
