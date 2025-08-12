import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryProduct } from '../models/inventory-product';

@Injectable({
  providedIn: 'root'
})
export class InventoryProductService {
  private baseUrl = 'http://localhost:8080/elan/inventory/v1/inventory/product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<InventoryProduct[]> {
    return this.http.get<InventoryProduct[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<InventoryProduct> {
    return this.http.get<InventoryProduct>(`${this.baseUrl}/${id}`);
  }

  addProduct(product: InventoryProduct): Observable<InventoryProduct> {
    return this.http.post<InventoryProduct>(this.baseUrl, product);
  }

  updateProduct(id: number, product: InventoryProduct): Observable<InventoryProduct> {
    return this.http.put<InventoryProduct>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
