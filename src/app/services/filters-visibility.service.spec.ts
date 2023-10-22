import { TestBed } from '@angular/core/testing';

import { FiltersVisibilityService } from './filters-visibility.service';

describe('FiltersVisibilityService', () => {
  let service: FiltersVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
