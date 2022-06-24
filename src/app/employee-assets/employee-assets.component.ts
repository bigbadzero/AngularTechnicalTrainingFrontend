import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../shared/services/assetService';
import { AssetTypeService } from '../shared/services/assetTypeService';
import { EmployeeService } from '../shared/services/employeeService';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Asset } from '../shared/models/asset';
import { AssetType } from '../shared/models/assetType';
import { Employee } from '../shared/models/employee';
import { AssetEditDialogComponent } from '../components/dialogs/asset-edit-dialog/asset-edit-dialog.component';
import {AssetAddDialogComponent} from '../components/dialogs/asset-add-dialog/asset-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-assets',
  templateUrl: './employee-assets.component.html',
  styleUrls: ['./employee-assets.component.scss'],
})
export class EmployeeAssetsComponent implements OnInit {
  assetTypes: AssetType[];
  employees: Employee[];
  id: number;
  sub;
  dataSource: any;
  loading: boolean = true;
  employee: Employee;
  employeeName: string;
  columnsToDisplay = [
    'tagID',
    'assetType.name',
    'description',
    'employee.name',
    'dateAdded',
    'action',
  ];

  constructor(
    private _Activatedroute: ActivatedRoute,
    public assetService: AssetService,
    public assetTypeService: AssetTypeService,
    public employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.sub = this._Activatedroute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.loadAssetsByEmployee(this.id);

    this.assetTypeService.getAllAssetTypes().subscribe(
      (result) => {
        this.assetTypes = result;
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('complete loading assetTypes');
      }
    );

    this.employeeService.getAllEmployees().subscribe(
      (result) => {
        this.employees = result;
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('complete loading employees');
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadAssetsByEmployee(employeeId: number) {
    this.assetService.getAllAssetsAssignedToEmployee(employeeId).subscribe(
      (result) => {
        setTimeout(() => {
          this.loading = false;
        }, 500);

        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.employee = result[0].employee;
        this.employeeName = this.employee.name;
      },
      (error) => {
        alert(error.message);
      }
    ),
      () => {
        console.log('complete loading assets');
      };
  }

  edit(row): void {
    let dataAsset = this.dataSource._data._value[row];
    console.log(dataAsset);
    const asset: Asset = {
      tagId: dataAsset.tagID,
      assetTypeId: dataAsset.assetTypeId,
      assetType: dataAsset.assetType,
      description: dataAsset.description,
      employeeId: dataAsset.employeeId,
      employee: dataAsset.employee,
      dateAdded: dataAsset.dateAdded,
      retired: dataAsset.retired,
      dateRetired: dataAsset.dateRetired,
    };

    const dialogRef = this.dialog.open(AssetEditDialogComponent, {
      width: '300px',
      data: {
        asset: asset,
        assetTypes: this.assetTypes,
        employees: this.employees,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  add():void{
    const asset: Asset = {
      employeeId: this.employee.id,
      employee : this.employee
    }
    const dialogRef = this.dialog.open(AssetAddDialogComponent, {
      width: '300px',
      data:{
        asset:asset,
        assetTypes: this.assetTypes,
        employees: this.employees,
        lockEmployee: true
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
