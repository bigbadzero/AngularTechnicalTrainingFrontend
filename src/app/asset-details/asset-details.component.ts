import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Asset } from '../shared/models/asset';
import {AssetType} from '../shared/models/assetType';
import {Employee} from '../shared/models/employee';
import { AssetService } from '../shared/services/assetService';
import { AssetTypeService } from '../shared/services/assetTypeService';
import { EmployeeService } from '../shared/services/employeeService';
import { MatDialog } from '@angular/material/dialog';
import { AssetEditDialogComponent } from '../components/dialogs/Asset/asset-edit-dialog/asset-edit-dialog.component';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
})
export class AssetDetailsComponent implements OnInit {
  sub;
  id: number;
  loading: boolean = true;
  dataSource: any;
  assets: Asset[] = [];
  columnsToDisplay = [
    'tagID',
    'assetType.name',
    'description',
    'employee.name',
    'dateAdded',
    'action',
  ];
  assetTypes: AssetType[];
  employees: Employee[];

  constructor(
    private _Activatedroute: ActivatedRoute,
    public assetService: AssetService,
    public employeeService: EmployeeService,
    public assetTypeService: AssetTypeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sub = this._Activatedroute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getAsset(this.id);
  }

  getAsset(tagId: number) {
    this.assetService.getAssetById(tagId).subscribe(
      (result) => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
        this.assets.push(result);
        this.dataSource = new MatTableDataSource(this.assets);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('retrieved asset');
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
        employees: this.employees,
        assetTypes: this.assetTypes,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
