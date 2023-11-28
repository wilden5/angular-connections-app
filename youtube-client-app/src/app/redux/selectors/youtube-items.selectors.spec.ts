import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { AppState } from '../app.state';
import { itemsReducer } from '../reducers/items.reducer';
import { loadYoutubeItems } from '../actions/youtube-items.actions';
import { ISearchItem } from '../../youtube/models/search-item.model';
import { selectSpecificYoutubeItem } from './youtube-items.selectors';

describe('CustomItemsSelectors', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          appState: itemsReducer,
        }),
      ],
    });
    store = TestBed.inject(Store);
  });

  it('should select specific youtube item', (done) => {
    const youtubeItemsMock = [{ id: '1' }, { id: '2' }];
    const action = loadYoutubeItems({ youtubeItems: youtubeItemsMock as unknown as ISearchItem[] });
    store.dispatch(action);

    store.select(selectSpecificYoutubeItem(youtubeItemsMock[1].id)).subscribe((item) => {
      expect(item).toEqual({ id: '2' });
      done();
    });
  });
});
