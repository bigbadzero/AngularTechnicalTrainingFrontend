import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  id:number;
  constructor(private _Activatedroute:ActivatedRoute) { }
  sub;
  ngOnInit(): void {
    this.sub = this._Activatedroute.params.subscribe(params =>{
      this.id = params['id'];
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
