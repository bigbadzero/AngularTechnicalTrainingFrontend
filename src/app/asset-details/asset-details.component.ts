import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AssetService} from '../shared/services/assetService';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
})
export class AssetDetailsComponent implements OnInit {
  sub;
  id: number;
  loading:boolean = true;

  constructor(private _Activatedroute: ActivatedRoute, public assetService:AssetService) {}

  ngOnInit(): void {
    this.sub = this._Activatedroute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getAsset(this.id);
  }

  getAsset(tagId:number){
    this.assetService.getAssetById(tagId).subscribe((result) =>{
      setTimeout(() => {
        this.loading = false;
      },500);
      console.log(result);
    }, err =>{
      console.log(err);
    }, () =>{
      console.log('retrieved asset')
    });
  }
}
