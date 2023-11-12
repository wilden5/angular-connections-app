import { ICustomSearchItem, ISearchItem } from '../youtube/models/search-item.model';

export interface AppState {
  readonly youtubeItem: ISearchItem[];
  readonly customItem: ICustomSearchItem[];
}
