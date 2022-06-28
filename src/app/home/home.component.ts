import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Asset } from '../shared/models/asset';
import { AssetType } from '../shared/models/assetType';
import { Employee } from '../shared/models/employee';
import { AssetService } from '../shared/services/assetService';
import { AssetTypeService } from '../shared/services/assetTypeService';
import { EmployeeService } from '../shared/services/employeeService';
import { MatDialog } from '@angular/material/dialog';
import { AssetEditDialogComponent } from '../components/dialogs/Asset/asset-edit-dialog/asset-edit-dialog.component';
import { AssetAddDialogComponent } from '../components/dialogs/Asset/asset-add-dialog/asset-add-dialog.component';
import { NGXLogger } from 'ngx-logger';

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
  loading: boolean;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    public dialog: MatDialog,
    private logger: NGXLogger
  ) {}

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  ngOnInit(): void {
    this.logger.trace("home component initialized");
    this.loading = true;
    this.loadAssets();
    this.loadAssetTypes();
    this.loadEmployees();
  }

  loadAssets() {
    this.logger.trace("loading assets");
    return (
      this.assetService.getAllAssets().subscribe(
        (x) => {
          this.logger.trace("loading assets success");
          setTimeout(() => {
            this.loading = false;
          }, 500);
          this.Assets = x;
          this.dataSource = new MatTableDataSource(x);
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'assetType.name': return item.assetType.name;
              case 'employee.name' : return item.employee.name;
              default: return item[property];
            }
          };


          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          this.logger.debug(error.message);
        }
      ),
      () => {
        this.logger.trace('complete loading assets');
      }
    );
  }

  loadAssetTypes() {
    this.logger.trace("loading assetTypes");
    this.assetTypeService.getAllAssetTypes().subscribe(
      (result) => {
        this.logger.trace("loading assetTypes Success");
        this.assetTypes = result;
      },
      (err) => {
        this.logger.debug(err.message);
      },
      () => {
        this.logger.trace('complete loading assetTypes');
      }
    );
  }

  loadEmployees() {
    this.logger.trace("loading employees");
    this.employeeService.getAllEmployees().subscribe(
      (result) => {
        this.logger.trace("loading employees success");
        this.employees = result;
      },
      (err) => {
        this.logger.debug(err.message);
      },
      () => {
        this.logger.trace('complete loading employees');
      }
    );
  }

  edit(row): void {
    this.logger.trace("editing asset from Home Component");
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

    this.logger.trace('opening AssetEditDialogComponent from Home Component');
    const dialogRef = this.dialog.open(AssetEditDialogComponent, {
      width: '300px',
      data: {
        asset: asset,
        employees: this.employees,
        assetTypes: this.assetTypes,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.logger.trace('The AssetEditDialogComponent was closed back on Home Component');
    });
  }

  add(): void {
    this.logger.trace('Adding asset from AssetEditDialogComponent');
    const asset: Asset = {};
    this.logger.trace('opening AssetAddDialogComponent from home component');
    const dialogRef = this.dialog.open(AssetAddDialogComponent, {
      width: '300px',
      data: {
        asset: asset,
        assetTypes: this.assetTypes,
        employees: this.employees,
        lockEmployee: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.logger.trace('The AssetAddDialogComponent was closed back on Home Component');
    });
  }
}
