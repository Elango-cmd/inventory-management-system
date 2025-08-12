import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventorySupplier } from '../models/inventory-supplier';

@Injectable({
  providedIn: 'root'
})
export class InventorySupplierService {

  private baseUrl = 'http://localhost:8080/elan/inventory/v1/inventory/supplier';

  constructor(private http: HttpClient) {}

  // Get all suppliers
  getAllSuppliers(): Observable<InventorySupplier[]> {
    return this.http.get<InventorySupplier[]>(this.baseUrl);
  }

  // Get supplier by ID
  getSupplierById(id: number): Observable<InventorySupplier> {
    return this.http.get<InventorySupplier>(`${this.baseUrl}/${id}`);
  }

  // Create supplier
  createSupplier(supplier: InventorySupplier): Observable<InventorySupplier> {
    return this.http.post<InventorySupplier>(this.baseUrl, supplier);
  }

  // Update supplier
  updateSupplier(id: number, supplier: InventorySupplier): Observable<InventorySupplier> {
    return this.http.put<InventorySupplier>(`${this.baseUrl}/${id}`, supplier);
  }

  // Delete supplier
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
