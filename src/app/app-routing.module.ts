import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EmployeeComponent} from './employee/employee.component'
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeAssetsComponent} from './employee-assets/employee-assets.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  { 
    path:"employee/detail/:id",
    component: EmployeeDetailComponent
  },
  { 
    path:"assets/employee/:id",
    component: EmployeeAssetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
