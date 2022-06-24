import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeAssetsService } from './employee-assets.component.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Asset } from '../shared/asset';
import { AssetType } from '../shared/assetType';
import { Employee } from '../shared/employee';
import { NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AssetDialogData } from '../shared/assetDialogData';

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
    public employeeAssetsService: EmployeeAssetsService,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.sub = this._Activatedroute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.loadAssetsByEmployee(this.id);

    this.employeeAssetsService.getAllAssetTypes().subscribe(
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

    this.employeeAssetsService.getAllEmployees().subscribe(
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
    this.employeeAssetsService
      .getAllAssetsAssignedToEmployee(employeeId)
      .subscribe(
        (result) => {
          this.loading = false;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.employeeName = result[0].employee.name;
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

    const dialogRef = this.dialog.open(EmployeeAssetsDialog, {
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
}

@Component({
  selector: 'employee-assets-dialog',
  templateUrl: 'employee-assets-dialog.html',
})
export class EmployeeAssetsDialog {
  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<EmployeeAssetsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssetDialogData,
    public employeeAssetsService: EmployeeAssetsService
  ) {
    console.log(this.data);
  }

  onInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    let retired:boolean;
    if(form.value.retired === true) {
      retired === true;
    }
    else{
      retired === false;
    }
    console.log(form.value);
    const asset: Asset ={
      tagId: form.value.tagId,
      assetTypeId: form.value.assetTypeId,
      description: form.value.description,
      employeeId: form.value.employeeId,
      dateAdded: form.value.dateAdded,
      retired: retired,
      dateRetired: form.value.dateRetired,
    }
    this.employeeAssetsService.updateAsset(asset).subscribe((result) =>{
      this.dialogRef.close();
    }, err =>{
      console.log(err);
    }, () =>{
      console.log("record updated");
      window.location.reload();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
