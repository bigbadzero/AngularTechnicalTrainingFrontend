import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../shared/services/employeeService';
import { MatDialog } from '@angular/material/dialog';
import {EmployeeEditDialogComponent} from '../components/dialogs/Employee/employee-edit-dialog/employee-edit-dialog.component';
import {EmployeeAddDialogComponent} from '../components/dialogs/Employee/employee-add-dialog/employee-add-dialog.component'
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

  constructor(
    public employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

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

  edit(row): void {
    let dataAsset = this.dataSource._data._value[row];

    const dialogRef = this.dialog.open(EmployeeEditDialogComponent, {
      width: '300px',
      data: {
        id: dataAsset.id,
        email: dataAsset.email,
        name: dataAsset.name
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  add(): void {

    const dialogRef = this.dialog.open(EmployeeAddDialogComponent, {
      width: '300px',
      data: {
        name: '',
        description: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
