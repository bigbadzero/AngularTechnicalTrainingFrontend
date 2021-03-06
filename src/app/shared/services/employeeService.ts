import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiURL = 'https://localhost:7289';
  /**
   *
   */
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.apiURL + '/Employee')
      .pipe(retry(1), catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.apiURL + '/Employee',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.apiURL + '/Employee',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
