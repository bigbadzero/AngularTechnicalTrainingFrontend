import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Asset } from '../shared/models/asset';
import {AssetType} from '../shared/models/assetType';
import {Employee} from '../shared/models/employee';
import { AssetService } from '../shared/services/assetService';
import { AssetTypeService } from '../shared/services/assetTypeService';
import { EmployeeService } from '../shared/services/employeeService';
import { MatDialog } from '@angular/material/dialog';
import { AssetEditDialogComponent } from '../components/dialogs/asset-edit-dialog/asset-edit-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Assets: Asset[];
  assetTypes: AssetType[];
  employees: Employee[];
  dataSource: any;
  loading: boolean = true;

  columnsToDisplay = [
    'tagID',
    'assetType.name',
    'description',
    'employee.name',
    'dateAdded',
    'action',
  ];
  constructor(
    public assetService: AssetService,
    public employeeService: EmployeeService,
    public assetTypeService: AssetTypeService,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadAssets();
    this.loadAssetTypes();
  }

  loadAssets() {
    return (
      this.assetService.getAllAssets().subscribe(
        (x) => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
          this.Assets = x;
          this.dataSource = new MatTableDataSource(x);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          alert(error.message);
        }
      ),
      () => {
        console.log('complete loading assets');
      }
    );
  }

  loadAssetTypes(){
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
  }

  loadEmployees(){
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

  edit(row): void {
    console.log(row);
    console.log(this.dataSource);
    let dataAsset = this.dataSource._data._value[row];
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
        employees:this.employees,
        assetTypes: this.assetTypes,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
