import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Asset} from '../shared/asset';
import {AssetService} from '../shared/services/assetService'

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
  constructor(public assetService: AssetService) {}
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(){
    return this.assetService.getAllAssets().subscribe(x =>{
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
