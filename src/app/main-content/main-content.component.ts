import { Component } from '@angular/core';
import { PageManagerService } from '../services/page-manager.service';
import { QueryMessage, QueryType, MessageType, MessageService } from '@proav/angular-lib';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  pageToShow = "";
  elementId: number = -1;

  constructor(private pageService: PageManagerService, private messageService:MessageService ) {
    console.log("The Element ID as string: ", this.elementId.toString())
  }

  ngOnInit() {
    this.pageService.currentPage$.subscribe((page) => {
      this.pageToShow = page;
      console.log("Requesting Page Config: ", page);
      const message: QueryMessage = {
        messagetype: MessageType.Query,
        querytype: QueryType.Pages,
        pageid: page
      };
      this.messageService.sendJsonMessage(JSON.stringify(message));
    });
  }
}
