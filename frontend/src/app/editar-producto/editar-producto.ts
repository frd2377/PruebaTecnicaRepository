import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../services/productos-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto {

  private productoService = inject(ProductosService)
  private router = inject(Router)
  private params = inject(ActivatedRoute)

  id: string = ""
  producto!: Producto;

  editarForm = new FormGroup({
    productoId: new FormControl(0),
    nombre: new FormControl("", [Validators.nullValidator, Validators.required]),
    descripcion: new FormControl("", [Validators.nullValidator, Validators.required]),
    categoria: new FormControl("", [Validators.nullValidator, Validators.required]),
    imagen: new FormControl("", [Validators.nullValidator, Validators.required]),
    precio: new FormControl(0, [Validators.min(1)]),
    stock: new FormControl(0, [Validators.min(1)]),
  })

  constructor() {
    this.id = this.params.snapshot.paramMap.get('id')!;
    this.productoService.getProductById(parseInt(this.id)).subscribe({
      next: value => {
        this.editarForm.setValue({
          categoria: value.categoria,
          descripcion: value.descripcion,
          imagen: value.imagen,
          nombre: value.nombre,
          precio: value.precio,
          productoId: value.productoId,
          stock: value.stock
        })
      },
      error: error => console.log(error)
    })
  }

  editarProducto() {
    if (!this.editarForm.valid) {
      return
    }
    
    this.productoService.putProduct(this.editarForm.value as Producto).subscribe({
      next: value => {
        this.router.navigateByUrl("productos")
      },
      error: error => console.log(error)
    })
  }

  cancelar() {
    this.router.navigateByUrl("productos")
  }
}
