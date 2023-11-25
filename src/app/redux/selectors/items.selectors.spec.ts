import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { AppState } from '../app.state';
import { itemsReducer } from '../reducers/items.reducer';
import { ISearchItem } from '../../youtube/models/search-item.model';
import { addCustomItem } from '../actions/custom-item.actions';
import { loadYoutubeItems } from '../actions/youtube-items.actions';
import { selectAllItems } from './items.selectors';

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

  it('should select all items', (done) => {
    const customItem: Partial<ISearchItem> = { id: { kind: 'custom#item', videoId: 'idc-1' } };
    const youtubeItemsMock = [{ id: '1' }, { id: '2' }];
    const action = loadYoutubeItems({ youtubeItems: youtubeItemsMock as unknown as ISearchItem[] });
    const addCustom = addCustomItem({ customItem: customItem as ISearchItem });

    store.dispatch(action);
    store.dispatch(addCustom);

    store.select(selectAllItems).subscribe((items) => {
      expect(items).toEqual([{ id: { kind: 'custom#item', videoId: 'idc-1' } }, { id: '1' }, { id: '2' }]);
      done();
    });
  });
});
