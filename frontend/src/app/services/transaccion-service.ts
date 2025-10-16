import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private httpClient = inject(HttpClient)
  
  url = "http://localhost:7227"

  getTransacciones(){
    return this.httpClient.get<Transaccion[]>(`${this.url}/api/transaccion`)
  }

  postTransaccion(data: Transaccion){
    return this.httpClient.post<Transaccion>(`${this.url}/api/transaccion`, data)
  }

  deleteTransaccion(transaccionId: number){
    return this.httpClient.delete<object>(`${this.url}/api/transaccion`, {
      body: transaccionId
    })
  }
}
