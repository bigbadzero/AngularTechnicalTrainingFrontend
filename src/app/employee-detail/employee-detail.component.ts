import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeDetailService} from './employee-detail.component.service'

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  id:number;
  constructor(private _Activatedroute:ActivatedRoute, public employeeDetailService: EmployeeDetailService) { }
  sub;



  ngOnInit(): void {
    this.sub = this._Activatedroute.params.subscribe(params =>{
      this.id = params['id'];
    });

    this.loadAssetsByEmployee(this.id);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadAssetsByEmployee(employeeId: number){
    this.employeeDetailService.getAllAssetsAssignedToEmployee(employeeId).subscribe(result=>{
      console.log(result);
    })
  }



}
