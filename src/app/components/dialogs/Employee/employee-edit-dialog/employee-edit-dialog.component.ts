import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../shared/services/employeeService';
import { NgForm } from '@angular/forms';
import { EmployeeDialogData } from '../../../../shared/models/employeeDialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.scss']
})
export class EmployeeEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData,
    public employeeService: EmployeeService,
    private logger: NGXLogger
  ) { }

  ngOnInit(): void {
    this.logger.trace('initializing asset-edit-dialog component')
  }

  onSubmit(form: NgForm){
    this.logger.trace('submitting form to edit employee')
    const employee: Employee = {
      id: form.value.id,
      email: form.value.email,
      name: form.value.name
    };
    this.logger.trace('editing employee');
    this.employeeService.updateEmployee(employee).subscribe(
      (result) => {
        this.dialogRef.close();
      },
      (err) => {
        this.logger.error(err);
      },
      () => {
        this.logger.trace('employee updated');
        window.location.reload();
      }
    );
  }

  onNoClick(): void {
    this.logger.trace('closing EmployeeEditDialogComponent')
    this.dialogRef.close();
  }
}
