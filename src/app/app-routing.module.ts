import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EmployeeComponent} from './employee/employee.component'
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  { 
    path:"employee/detail/:id",
    component: EmployeeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
