import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularTechnicalTrainingFrontend';
  /**
   *
   */
  constructor(private logger: NGXLogger) {}
  ngOnInit(): void {
    this.logger.trace('application started')
  }
}
