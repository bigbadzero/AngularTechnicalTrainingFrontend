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
import { AssetEditDialogComponent } from '../components/dialogs/Asset/asset-edit-dialog/asset-edit-dialog.component';
import { AssetAddDialogComponent } from '../components/dialogs/Asset/asset-add-dialog/asset-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';

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
  loading: boolean;
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
    public dialog: MatDialog,
    private logger: NGXLogger
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.logger.trace('initializing employee-assets component');
    this.loading = true;
    this.sub = this._Activatedroute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.loadAssetsByEmployee(this.id);
    this.getAllEmployees();
    this.getAllAssetTypes();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadAssetsByEmployee(employeeId: number) {
    this.logger.trace('loading assets by employee')
    this.assetService.getAllAssetsAssignedToEmployee(employeeId).subscribe(
      (result) => {
        setTimeout(() => {
          this.loading = false;
        }, 500);

        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'assetType.name':
              return item.assetType.name;
            case 'employee.name':
              return item.employee.name;
            default:
              return item[property];
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.employee = result[0].employee;
        this.employeeName = this.employee.name;
      },
      (error) => {
        this.logger.error(error.message);
      }
    ),
      () => {
        this.logger.trace('completed loading assets');
      };
  }

  getAllEmployees() {
    this.logger.trace('loading all employees');
    this.employeeService.getAllEmployees().subscribe(
      (result) => {
        this.employees = result;
      },
      (err) => {
        this.logger.error(err);
      },
      () => {
        this.logger.trace('completed loading employees');
      }
    );
  }

  getAllAssetTypes() {
    this.logger.trace('loading all asset types')
    this.assetTypeService.getAllAssetTypes().subscribe(
      (result) => {
        this.assetTypes = result;
      },
      (err) => {
        this.logger.error(err);
      },
      () => {
        this.logger.trace('completed loading assetTypes');
      }
    );
  }

  edit(row): void {
    this.logger.trace('editing asset from employee-assets component')
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

    this.logger.trace('opening AssetEditDialogComponent from employee-asset component')
    const dialogRef = this.dialog.open(AssetEditDialogComponent, {
      width: '300px',
      data: {
        asset: asset,
        assetTypes: this.assetTypes,
        employees: this.employees,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.logger.trace('The AssetEditDialogComponent was closed');
    });
  }

  add(): void {
    this.logger.trace('adding asset from employee-assets component')
    const asset: Asset = {
      employeeId: this.employee.id,
      employee: this.employee,
    };
    this.logger.trace('opening AssetAddDialogComponent from employee-asset component')
    const dialogRef = this.dialog.open(AssetAddDialogComponent, {
      width: '300px',
      data: {
        asset: asset,
        assetTypes: this.assetTypes,
        employees: this.employees,
        lockEmployee: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.logger.trace('The AssetAddDialogComponent was closed');
    });
  }
}
