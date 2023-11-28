import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { FilterComponent } from './filter.component';
import { CustomButtonComponent } from '../../../shared/components/custom-button.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [CustomButtonComponent],
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send sortByViewsRequested event', () => {
    const event = jest.spyOn(component.sortByViewsRequested, 'emit');
    const sortByViewsButton = fixture.debugElement.query(By.css('.sort-by-views-button'));
    sortByViewsButton.triggerEventHandler('buttonClickRequested', null);

    expect(event).toHaveBeenCalled();
  });

  it('should send onSortByKeywordInputChange event', () => {
    const searchQuery = 'test';
    const event = jest.spyOn(component.sortByKeyWordRequested, 'emit');
    const filterInput = fixture.nativeElement.querySelector('.filter-input');
    filterInput.value = searchQuery;
    filterInput.dispatchEvent(new Event('keyup'));

    expect(event).toHaveBeenCalledWith(searchQuery);
  });
});
