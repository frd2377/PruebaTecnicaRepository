import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private httpClient = inject(HttpClient)

  url = "http://localhost:7030"

  getProducts(){
    return this.httpClient.get<Producto[]>(`${this.url}/api/producto`)
  }

  getProductById(productoId: number){
    return this.httpClient.get<Producto>(`${this.url}/api/producto/${productoId}`)
  }

  postProduct(data: Producto){
    return this.httpClient.post<object>(`${this.url}/api/producto`, data)
  }

  putProduct(data: Producto){
    return this.httpClient.put<object>(`${this.url}/api/producto`, data)
  }

  deleteProduct(productoId: number){
    return this.httpClient.delete<object>(`${this.url}/api/producto`,{
      body: productoId
    })
  }
}
