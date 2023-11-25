import { Action } from '@ngrx/store';
import { initialAppState, itemsReducer } from './items.reducer';
import { ISearchItem } from '../../youtube/models/search-item.model';
import { addYoutubeItemToFavoriteList, loadYoutubeItems, sortYoutubeItems } from '../actions/youtube-items.actions';
import { addCustomItem, deleteCustomItem } from '../actions/custom-item.actions';

describe('ItemsReducer', () => {
  it('should return the default state', () => {
    const action: Action = { type: 'unknown' };
    const state = itemsReducer(initialAppState, action);

    expect(state).toBe(initialAppState);
  });

  it('should load youtube items', () => {
    const youtubeItemsMock = [{ id: '1' }, { id: '2' }];
    const action = loadYoutubeItems({ youtubeItems: youtubeItemsMock as unknown as ISearchItem[] });
    const state = itemsReducer(initialAppState, action);

    expect(state.videoListIds).toEqual(['1', '2']);
  });

  it('should sort youtube items without changing videoItems order', () => {
    const youtubeItemsMock = [{ id: '1' }, { id: '2' }];
    const sortedYoutubeItemsMock = [{ id: '2' }, { id: '1' }];
    const action = loadYoutubeItems({ youtubeItems: youtubeItemsMock as unknown as ISearchItem[] });
    let state = itemsReducer(initialAppState, action);

    const sortAction = sortYoutubeItems({ youtubeItems: sortedYoutubeItemsMock as unknown as ISearchItem[] });
    state = itemsReducer(state, sortAction);

    expect(state.videoItems).toEqual({ '1': { id: '1' }, '2': { id: '2' } });
  });

  it('should add custom item', () => {
    const customItem: Partial<ISearchItem> = { id: { kind: 'custom#item', videoId: 'idc-1' } };
    const action = addCustomItem({ customItem: customItem as ISearchItem });
    const state = itemsReducer(initialAppState, action);

    expect(state.customItems).toEqual({ 'idc-1': { id: { kind: 'custom#item', videoId: 'idc-1' } } });
  });

  it('should delete custom item', () => {
    const customItem: Partial<ISearchItem> = { id: { kind: 'custom#item', videoId: 'idc-1' } };
    const addAction = addCustomItem({ customItem: customItem as ISearchItem });
    let state = itemsReducer(initialAppState, addAction);

    const customItemId = 'idc-1';
    const deleteAction = deleteCustomItem({ id: customItemId });
    state = itemsReducer(state, deleteAction);

    expect(state.customItems).toEqual({});
  });

  it('should add youtube item to favorite list', () => {
    const youtubeItemsMock = [{ id: '1' }, { id: '2' }];
    const loadAction = loadYoutubeItems({ youtubeItems: youtubeItemsMock as unknown as ISearchItem[] });
    let state = itemsReducer(initialAppState, loadAction);

    const youtubeItemId = '1';
    const addAction = addYoutubeItemToFavoriteList({ id: youtubeItemId });
    state = itemsReducer(state, addAction);

    expect(state.favoriteListIds).toEqual(['1']);
    expect(state.videoItems[youtubeItemId].favorite).toEqual(true);
  });
});
