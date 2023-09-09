import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './role'; // Import the Role model

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = '/api/roles'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all roles from the server
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  // Fetch a role by its ID from the server
  getRoleById(id: number): Observable<Role> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Role>(url);
  }

  // Add a new role to the server
  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

  // Update an existing role on the server
  updateRole(role: Role): Observable<Role> {
    const url = `${this.apiUrl}/${role.id}`;
    return this.http.put<Role>(url, role);
  }

  // Delete a role by its ID from the server
  deleteRole(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
