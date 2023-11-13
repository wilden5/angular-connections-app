import { ICustomSearchItem, ISearchItem } from '../youtube/models/search-item.model';

export interface AppState {
  readonly youtubeItems: ISearchItem[];
  readonly customItems: ICustomSearchItem[];
}
