import { TestBed } from '@angular/core/testing';

import { YoutubeItemService } from './youtube-item.service';

describe('YoutubeItemService', () => {
  let service: YoutubeItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
