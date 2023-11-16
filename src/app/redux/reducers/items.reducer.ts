import { createReducer, on } from '@ngrx/store';
import { loadYoutubeItems, sortYoutubeItems } from '../actions/youtube-items.actions';
import { AppState } from '../app.state';
import { addCustomItem, deleteCustomItem } from '../actions/custom-item.actions';

export const initialAppState: AppState = {
  videoItems: {},
  customItems: {},
  videoListIds: [],
  favoriteListIds: [],
};

export const itemsReducer = createReducer(
  initialAppState,
  on(loadYoutubeItems, (state, { youtubeItems }) => {
    const videoItems = youtubeItems.reduce(
      (acc, item) => ({
        ...acc,
        [String(item.id)]: item,
      }),
      {}
    );
    const videoListIds = youtubeItems.map((item) => String(item.id));
    return { ...state, videoItems, videoListIds };
  }),
  on(sortYoutubeItems, (state, { youtubeItems }) => {
    const videoListIds = youtubeItems.map((item) => String(item.id));
    return { ...state, videoListIds };
  }),
  on(addCustomItem, (state, { customItem }) => {
    return {
      ...state,
      customItems: { ...state.customItems, [customItem.id.videoId]: customItem },
    };
  }),
  on(deleteCustomItem, (state, { id }) => {
    const { [id]: removeItem, ...remainingItems } = state.customItems;
    return {
      ...state,
      customItems: remainingItems,
    };
  })
);
