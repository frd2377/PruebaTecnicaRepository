import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosService } from '../services/productos-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css'
})
export class CrearProducto {

  private productoService = inject(ProductosService)
  private router = inject(Router)

  crearForm = new FormGroup({
    productoId: new FormControl(0),
    nombre: new FormControl("", [Validators.nullValidator, Validators.required]),
    descripcion: new FormControl("", [Validators.nullValidator, Validators.required]),
    categoria: new FormControl("", [Validators.nullValidator, Validators.required]),
    imagen: new FormControl("", [Validators.nullValidator, Validators.required]),
    precio: new FormControl(0, [Validators.min(1)]),
    stock: new FormControl(0, [Validators.min(1)]),
  })

  guardarProducto(){
    if (!this.crearForm.valid) {
      return
    }

    this.productoService.postProduct(this.crearForm.value as Producto).subscribe({
      next: value => {
        this.router.navigateByUrl("productos")
      },
      error: error => console.log(error)
    })
  }

  cancelar(){
    this.router.navigateByUrl("productos")
  }

}
