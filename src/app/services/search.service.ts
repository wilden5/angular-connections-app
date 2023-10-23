import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery: string | undefined;

  isSearchTriggered = false;

  getSearchQuery(): string | undefined {
    return this.searchQuery;
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }
}
