import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {HomeService} from './home.component.service'
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Asset} from '../shared/asset';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Assets: Asset[];
  dataSource: any;
  loading: boolean = true;

  columnsToDisplay = ['tagID', 'assetType.name', 'description', 'employee.name', 'dateAdded'];
  constructor(public homeService: HomeService, private _liveAnnouncer: LiveAnnouncer) {}
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(){
    return this.homeService.getAllAssets().subscribe(x =>{
      this.loading = false;
      this.Assets = x;
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error =>{
      alert(error.message);
      
    }), () =>{
      console.log("complete loading assets");
    };
  }
}
