import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../shared/services/employeeService';
import { NgForm } from '@angular/forms';
import { EmployeeDialogData } from '../../../../shared/models/employeeDialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-employee-add-dialog',
  templateUrl: './employee-add-dialog.component.html',
  styleUrls: ['./employee-add-dialog.component.scss']
})
export class EmployeeAddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData,
    public employeeService: EmployeeService,
    private logger: NGXLogger
  ) { }

  ngOnInit(): void {
    this.logger.trace('initializing EmployeeAddDialogComponent')
  }

  onSubmit(form: NgForm){
    this.logger.trace('submitting form to add employee')
    const employee: Employee ={
      email: form.value.email,
      name: form.value.name
    }
    this.logger.trace('adding employee');
    this.employeeService.addEmployee(employee).subscribe(
      (result) => {
        this.dialogRef.close();
      },
      (err) => {
        this.logger.error(err);
      },
      () => {
        this.logger.trace('employee added');
        window.location.reload();
      }
    );

  }

  onNoClick(): void {
    this.logger.trace('closing EmployeeAddDialogComponent')
    this.dialogRef.close();
  }
}
