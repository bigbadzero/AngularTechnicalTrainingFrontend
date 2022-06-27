import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../shared/services/employeeService';
import { NgForm } from '@angular/forms';
import { EmployeeDialogData } from '../../../../shared/models/employeeDialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.scss']
})
export class EmployeeEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData,
    public employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    const employee: Employee = {
      id: form.value.id,
      email: form.value.email,
      name: form.value.name
    };

    this.employeeService.updateEmployee(employee).subscribe(
      (result) => {
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('record updated');
        window.location.reload();
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
