import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeAssetsService } from './employee-assets.component.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Asset } from '../shared/asset';
@Component({
  selector: 'app-employee-assets',
  templateUrl: './employee-assets.component.html',
  styleUrls: ['./employee-assets.component.scss'],
})
export class EmployeeAssetsComponent implements OnInit {
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
    'action'
  ];

  constructor(
    private _Activatedroute: ActivatedRoute,
    public employeeAssetsService: EmployeeAssetsService
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.sub = this._Activatedroute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.loadAssetsByEmployee(this.id);
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
}
