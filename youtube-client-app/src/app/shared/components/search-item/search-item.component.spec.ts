import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SearchItemComponent } from './search-item.component';
import { ProjectPath } from '../../../utils/project-constants';
import { IVideoId } from '../../../youtube/models/search-item.model';

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchItemComponent],
      imports: [StoreModule.forRoot({})],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to item details page when onMoreButtonClick is called', () => {
    const itemId = 'testId';
    const routerSpy = jest.spyOn(router, 'navigate');
    component.onMoreButtonClick(itemId);

    expect(routerSpy).toHaveBeenCalledWith([`${ProjectPath.Search}/${ProjectPath.Item}`, itemId]);
  });

  it('should check if item is favorite', (done) => {
    const favoriteListIds = ['id1', 'id2', 'id3'];
    component.favoriteListIds$ = of(favoriteListIds);
    component.isFavoriteItem('id1' as unknown as IVideoId).subscribe((isFavorite) => {
      expect(isFavorite).toBe(true);
      done();
    });
  });
});
