export interface ISearchItem {
  kind: string;
  etag: string;
  id: IVideoId;
  snippet: ISnippet;
  statistics: IStatistics;
}

interface ISnippet {
  publishedAt: string;
  channelId?: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle?: string;
  tags?: string[];
  categoryId?: string;
  liveBroadcastContent?: string;
  defaultLanguage?: string;
  localized?: ILocalized;
  defaultAudioLanguage?: string;
}

interface IThumbnails {
  default?: IThumbnail;
  medium: IThumbnail;
  high?: IThumbnail;
  standard?: IThumbnail;
  maxres?: IThumbnail;
}

interface IThumbnail {
  url: string;
  width: number;
  height: number;
}

interface ILocalized {
  title: string;
  description: string;
}

interface IStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface IVideoId {
  kind: string;
  videoId: string;
}
