import { TestBed } from '@angular/core/testing';

import { SongListService } from './song-list.service';

describe('SongListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongListService = TestBed.get(SongListService);
    expect(service).toBeTruthy();
  });
});
