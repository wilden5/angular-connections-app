import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');

  setSearchObservable(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQueryObservable(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }
}
