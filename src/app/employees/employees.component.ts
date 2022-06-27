import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../shared/services/employeeService';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  dataSource: any;
  loading: boolean;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay = ['id', 'name', 'email', 'action'];

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (result) => {
        setTimeout(() => {
          this.loading = false;
        }, 500);

        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('compelted loading employees');
      }
    );
  }
}
