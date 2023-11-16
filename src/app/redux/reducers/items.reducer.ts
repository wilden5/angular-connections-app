import { createReducer, on } from '@ngrx/store';
import { loadYoutubeItems, sortYoutubeItems } from '../actions/youtube-items.actions';
import { AppState } from '../app.state';
import { addCustomItem, deleteCustomItem } from '../actions/custom-item.actions';

export const initialAppState: AppState = {
  videoItems: {},
  videoListIds: [],
  favoriteListIds: [],
};

export const itemsReducer = createReducer(
  initialAppState,
  on(loadYoutubeItems, (state, { youtubeItems }) => {
    const videoItems = youtubeItems.reduce(
      (acc, item) => ({
        ...acc,
        [item.id.videoId ? item.id.videoId : String(item.id)]: item,
      }),
      {}
    );
    const videoListIds = youtubeItems.map((item) => (item.id.videoId ? item.id.videoId : String(item.id)));
    return { ...state, videoItems, videoListIds };
  }),
  on(sortYoutubeItems, (state, { youtubeItems }) => {
    const videoListIds = youtubeItems.map((item) => String(item.id));
    return { ...state, videoListIds };
  }),
  on(addCustomItem, (state, { customItem }) => {
    return {
      ...state,
      videoItems: { [customItem.id.videoId]: customItem, ...state.videoItems },
      videoListIds: [customItem.id.videoId, ...state.videoListIds],
    };
  }),
  on(deleteCustomItem, (state, { id }) => {
    const { [id]: removeItem, ...remainingItems } = state.videoItems;
    return {
      ...state,
      videoItems: remainingItems,
      videoListIds: state.videoListIds.filter((videoId) => videoId !== id),
    };
  })
);
