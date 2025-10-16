import { Component, inject, signal } from '@angular/core';
import { TransaccionService } from '../services/transaccion-service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transacciones',
  imports: [DatePipe],
  templateUrl: './transacciones.html',
  styleUrl: './transacciones.css'
})
export class Transacciones {
  private transaccionService = inject(TransaccionService)
  private router = inject(Router)

  transaccionesList = signal<Transaccion[]>([])

  constructor() {
    this.transaccionService.getTransacciones().subscribe({
      next: (values) => this.transaccionesList.set(values),
      error: (error) => console.log(error)
    })
  }

  realizarTransaccion() {
    this.router.navigateByUrl("transacciones/crear")
  }

  editar(transaccion: Transaccion) {
    console.log(transaccion);
  }

  eliminar(transaccionId: number) {
    this.transaccionService.deleteTransaccion(transaccionId).subscribe({
      next: value => {
        this.transaccionService.getTransacciones().subscribe({
          next: (values) => this.transaccionesList.set(values),
          error: (error) => console.log(error)
        })
      },
      error: error => console.log(error)
    })
  }
}
