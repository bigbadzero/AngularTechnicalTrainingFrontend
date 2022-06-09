import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {HomeService} from './home.component.service'
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Asset} from '../shared/asset';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Assets: Asset[];
  dataSource: any;
  columnsToDisplay = ['tagID', 'assetType.name', 'description', 'employee.name', 'dateAdded']
  constructor(public homeService: HomeService, private _liveAnnouncer: LiveAnnouncer) {
    
   }

   @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadAssets();
  }


  loadAssets(){
    return this.homeService.getAllAssets().subscribe(x =>{
      this.Assets = x;
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
    }, error =>{
      alert("there was an error");
    });
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
