import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { FiltersVisibilityService } from './filters-visibility.service';
import { ProjectPath } from '../../utils/project-constants';

describe('FiltersVisibilityService', () => {
  let service: FiltersVisibilityService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersVisibilityService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle isFiltersVisible', () => {
    expect(service.isFiltersVisible).toBeFalsy();
    service.toggleFiltersVisibility();
    expect(service.isFiltersVisible).toBeTruthy();
  });

  it('should return true for item route', () => {
    router.navigate([`${ProjectPath.Item}/test-item`]);
    expect(service.isItemOrMainRoute()).toBe(true);
  });
});
