import { Component, inject, signal } from '@angular/core';
import { ProductosService } from '../services/productos-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  private router = inject(Router)
  private productoService = inject(ProductosService)

  productosList = signal<Producto[]>([]);
  showCrear = true

  constructor() {
    this.productoService.getProducts().subscribe({
      next: (values) => this.productosList.set(values),
      error: (error) => console.log(error)
    })
  }

  navigate() {
    this.showCrear = false
    this.router.navigateByUrl("productos/crear")
  }

  editar(productoId: number) {
    this.router.navigateByUrl(`productos/editar/${productoId.toString()}`)
  }

  eliminar(productoId: number) {
    this.productoService.deleteProduct(productoId).subscribe({
      next: value => {
        this.productoService.getProducts().subscribe({
          next: (values) => this.productosList.set(values),
          error: (error) => console.log(error)
        })
      },
      error: (error) => console.log(error)
    })
  }
}
