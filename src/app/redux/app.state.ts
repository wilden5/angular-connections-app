import { ISearchItem } from '../youtube/models/search-item.model';

export interface AppState {
  readonly videoItems: { [id: string]: ISearchItem };
  readonly customItems: { [id: string]: ISearchItem };
  readonly videoListIds: string[];
  readonly favoriteListIds: string[];
}
