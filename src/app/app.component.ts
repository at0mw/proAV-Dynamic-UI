import { Component } from '@angular/core';
import { CrComMessageService } from '@proav/angular-lib';

declare var CrComLib: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proAV-Dynamic-UI';
  constructor(crComMessageService: CrComMessageService) {}
}
