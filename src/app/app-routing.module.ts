import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeAssetsComponent } from './employee-assets/employee-assets.component';
import { AssetDetailsComponent } from '../app/asset-details/asset-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'assets/employee/:id',
    component: EmployeeAssetsComponent,
  },
  {
    path: 'assetDetails/:id',
    component: AssetDetailsComponent,
  },
  { path: 'employees', 
    component: EmployeesComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
