import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryUser } from '../models/inventory-user';


@Injectable({
  providedIn: 'root'
})
export class InventoryUserService {
  
  private baseUrl = 'http://localhost:8080/elan/inventory/v1/inventory/user';

  constructor(private http: HttpClient) { }

  // ✅ Get all users
  getAllUsers(): Observable<InventoryUser[]> {
    return this.http.get<InventoryUser[]>(`${this.baseUrl}`);
  }

  // ✅ Get a user by ID
  getUserById(id: number): Observable<InventoryUser> {
    return this.http.get<InventoryUser>(`${this.baseUrl}/${id}`);
  }

  // ✅ Create a new user
  createUser(user: InventoryUser): Observable<InventoryUser> {
    return this.http.post<InventoryUser>(`${this.baseUrl}`, user);
  }

  // ✅ Update user
  updateUser(id: number, user: InventoryUser): Observable<InventoryUser> {
    return this.http.put<InventoryUser>(`${this.baseUrl}/${id}`, user);
  }

  // ✅ Delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ✅ Authenticate user (login)
  loginUser(username: string, password: string): Observable<InventoryUser> {
    return this.http.post<InventoryUser>(`${this.baseUrl}/login`, { username, password });
  }
}
