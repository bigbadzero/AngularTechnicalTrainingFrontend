import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

//angular generated components
import { HomeComponent } from './home/home.component';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { EmployeeAssetsComponent } from './employee-assets/employee-assets.component';
import { AssetEditDialogComponent } from './components/dialogs/Asset/asset-edit-dialog/asset-edit-dialog.component';
import { AssetAddDialogComponent } from './components/dialogs/Asset/asset-add-dialog/asset-add-dialog.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeAddDialogComponent } from './components/dialogs/Employee/employee-add-dialog/employee-add-dialog.component';
import { EmployeeEditDialogComponent } from './components/dialogs/Employee/employee-edit-dialog/employee-edit-dialog.component';

import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import { environment } from '../environments/environment';

const environmentConfig: any = environment.logger;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomSpinnerComponent,
    EmployeeAssetsComponent,
    AssetEditDialogComponent,
    AssetAddDialogComponent,
    AssetDetailsComponent,
    EmployeesComponent,
    EmployeeAddDialogComponent,
    EmployeeEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel[environmentConfig.level],
    } as any),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
