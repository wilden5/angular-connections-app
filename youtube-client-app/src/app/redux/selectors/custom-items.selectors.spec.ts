import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { AppState } from '../app.state';
import { itemsReducer } from '../reducers/items.reducer';
import { ISearchItem } from '../../youtube/models/search-item.model';
import { selectCustomItems, selectSpecificCustomItem } from './custom-items.selectors';
import { addCustomItem } from '../actions/custom-item.actions';

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

  it('should select custom items', (done) => {
    const customItem1: Partial<ISearchItem> = { id: { kind: 'custom#item', videoId: 'idc-1' } };
    const customItem2: Partial<ISearchItem> = { id: { kind: 'custom#item', videoId: 'idc-2' } };
    const addAction1 = addCustomItem({ customItem: customItem1 as ISearchItem });
    const addAction2 = addCustomItem({ customItem: customItem2 as ISearchItem });
    store.dispatch(addAction1);
    store.dispatch(addAction2);

    store.select(selectCustomItems).subscribe((customItems) => {
      expect(customItems).toEqual({
        'idc-1': customItem1,
        'idc-2': customItem2,
      });
      done();
    });
  });

  it('should select specific custom item', (done) => {
    const customItem: Partial<ISearchItem> = { id: { kind: 'custom#item', videoId: 'idc-1' } };
    const addAction = addCustomItem({ customItem: customItem as ISearchItem });
    store.dispatch(addAction);

    store.select(selectSpecificCustomItem(customItem.id?.videoId as string)).subscribe((item) => {
      expect(item).toEqual(customItem);
      done();
    });
  });
});
