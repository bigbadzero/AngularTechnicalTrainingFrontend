import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.component.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Assets: any =[];
  columnsToDisplay = ['tagID', 'assetType.name', 'description', 'employee.name', 'dateAdded']
  showTable: boolean = false;
  constructor(public homeService: HomeService) {
    
   }

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(){
    return this.homeService.getAllAssets().subscribe((data: {})=>{
      this.Assets = data;
      this.showTable = true;
      console.log(this.Assets);
    });
  }
}
