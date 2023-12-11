import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { YoutubeItemService } from './youtube-item.service';
import { ISearchItem } from '../models/search-item.model';
import { ISearchResponse } from '../models/search-response.model';

describe('YoutubeItemService', () => {
  let service: YoutubeItemService;
  let httpMock: HttpTestingController;
  const mockISearchItemResponse: Partial<ISearchItem>[] = [
    {
      id: {
        kind: 'youtube#video',
        videoId: 'id1',
      },
    },
    {
      id: {
        kind: 'youtube#video',
        videoId: 'id2',
      },
    },
    {
      id: {
        kind: 'youtube#video',
        videoId: 'id3',
      },
    },
  ];
  const mockISearchResponse: ISearchResponse = {
    etag: 'etag',
    items: mockISearchItemResponse as ISearchItem[],
    kind: 'youtube#searchListResponse',
    nextPageToken: 'qwerty1',
    pageInfo: {
      totalResults: 5,
      resultsPerPage: 5,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeItemService],
    });
    service = TestBed.inject(YoutubeItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get youtube items by search query', () => {
    const query = 'query123';

    service.getYoutubeItemsBySearchQuery(query).subscribe((response) => {
      expect(response).toEqual(mockISearchResponse.items);
    });

    const req = httpMock.expectOne(`search?part=snippet&q=${query}&maxResults=20&pageToken=`);
    expect(req.request.method).toBe('GET');
    req.flush(mockISearchResponse);

    const req2 = httpMock.expectOne(
      `videos?part=snippet,statistics&id=${mockISearchResponse.items.map((item) => item.id.videoId).join(',')}`
    );
    expect(req2.request.method).toBe('GET');
    req2.flush(mockISearchItemResponse);
  });

  it('should get youtube items by ids', () => {
    const ids = mockISearchItemResponse.map((item) => item.id?.videoId).join(',');
    service.getYoutubeItemsByIds(ids).subscribe((response) => {
      expect(response).toEqual(mockISearchItemResponse);
    });
    const req = httpMock.expectOne(`videos?part=snippet,statistics&id=${ids}`);
    req.flush(mockISearchItemResponse);
  });
});
