import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.component.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Assets: any =[];
  constructor(public homeService: HomeService) { }

  ngOnInit(): void {
  }

  loadAssets(){
    return this.homeService.getAllAssets().subscribe((data: {})=>{
      this.Assets = data;
      console.log(this.Assets);
    });
  }
}
