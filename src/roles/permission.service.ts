import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from './permission';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private apiUrl = '/api/permissions'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all permissions from the server
  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUrl);
  }

  // Fetch a permission by its ID from the server
  getPermissionById(id: number): Observable<Permission> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Permission>(url);
  }

  // Add a new permission to the server
  addPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.apiUrl, permission);
  }

  // Update an existing permission on the server
  updatePermission(permission: Permission): Observable<Permission> {
    const url = `${this.apiUrl}/${permission.id}`;
    return this.http.put<Permission>(url, permission);
  }

  // Delete a permission by its ID from the server
  deletePermission(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
