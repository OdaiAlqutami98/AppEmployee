import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Interface/Employee';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  // Get employee by ID
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.apiUrl}/Employee/GetById`, { params: { id: id } });
  }

  // Add or Edit employee
  addEditEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${environment.apiUrl}/Employee/AddEdit`, employee);
  }

  // Get list of employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/Employee/GetEmployee`);
  }

  // Delete employee by ID
  deleteEmployees(employeeId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Employee/Delete/${employeeId}`);
  }
}
