import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../../../shared/shared.module';
import { CustomButtonComponent } from '../../../shared/components/custom-button.component';
import { FiltersVisibilityService } from '../../../youtube/services/filters-visibility.service';
import { LoginService } from '../../../auth/services/login.service';
import { SearchService } from '../../../youtube/services/search.service';
import { ProjectPath } from '../../../utils/project-constants';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let filtersVisibilityService: FiltersVisibilityService;
  let loginService: LoginService;
  let searchService: SearchService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule, CustomButtonComponent, NgOptimizedImage],
    });
    router = TestBed.inject(Router);
    filtersVisibilityService = TestBed.inject(FiltersVisibilityService);
    loginService = TestBed.inject(LoginService);
    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filters visibility', () => {
    const filtersVisibilitySpy = jest.spyOn(filtersVisibilityService, 'toggleFiltersVisibility');
    component.onToggleFiltersButtonClick();
    expect(filtersVisibilitySpy).toHaveBeenCalled();
  });

  it('should logout user', () => {
    const loginSpy = jest.spyOn(loginService, 'logout');
    component.onLogoutButtonClick();
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should set search observable and navigate if search query is more than 2 symbols', () => {
    const searchQuery = 'test';
    const searchServiceSpy = jest.spyOn(searchService, 'setSearchObservable');
    const routerSpy = jest.spyOn(router, 'navigate');
    component.onSearchInputChange(searchQuery);
    expect(searchServiceSpy).toHaveBeenCalledWith(searchQuery);
    expect(routerSpy).toHaveBeenCalledWith([ProjectPath.Search]);
  });
});
