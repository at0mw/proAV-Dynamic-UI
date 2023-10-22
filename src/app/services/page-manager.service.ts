import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageManagerService {

  constructor() { }
  private currentPageSubject = new BehaviorSubject<string>('home');
  currentPage$: Observable<string> = this.currentPageSubject.asObservable();

  setPage(page: string) {
    this.currentPageSubject.next(page);
  }
}
