import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from '../shared/services/employeeService';
import { MatDialog } from '@angular/material/dialog';
import {EmployeeEditDialogComponent} from '../components/dialogs/Employee/employee-edit-dialog/employee-edit-dialog.component';
import {EmployeeAddDialogComponent} from '../components/dialogs/Employee/employee-add-dialog/employee-add-dialog.component'
import { NGXLogger } from 'ngx-logger';

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
    public dialog: MatDialog,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.logger.trace("initializing employees component");
    this.loading = true;
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.logger.trace("loading employees");
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
        this.logger.error(err);
      },
      () => {
        this.logger.trace('compelted loading employees');
      }
    );
  }

  edit(row): void {
    this.logger.trace("edditing employee")
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
      this.logger.trace('The EmployeeEditDialogComponent  was closed');
    });
  }

  add(): void {
    this.logger.trace("adding new employee")
    const dialogRef = this.dialog.open(EmployeeAddDialogComponent, {
      width: '300px',
      data: {
        name: '',
        description: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.logger.trace('The EmployeeAddDialogComponent  was closed');
    });
  }

}
