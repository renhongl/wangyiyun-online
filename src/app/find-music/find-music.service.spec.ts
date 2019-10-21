import { TestBed } from '@angular/core/testing';

import { FindMusicService } from './find-music.service';

describe('FindMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindMusicService = TestBed.get(FindMusicService);
    expect(service).toBeTruthy();
  });
});
