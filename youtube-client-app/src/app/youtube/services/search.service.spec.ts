import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set new value for searchQuerySubject observable', (done) => {
    service.getSearchQueryObservable().subscribe((value) => {
      expect(value).toBe('query123');
      done();
    });
    service.setSearchObservable('query123');
  });
});
