import { Component } from '@angular/core';
import { PageManagerService } from '../services/page-manager.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  pageToShow = "";
  elementId: number = -1;

  constructor(private pageService: PageManagerService) {
    console.log("The Element ID as string: ", this.elementId.toString())
  }

  ngOnInit() {
    this.pageService.currentPage$.subscribe((page) => {
      this.pageToShow = page;
    });
  }
}
