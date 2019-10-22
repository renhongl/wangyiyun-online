import { TestBed } from '@angular/core/testing';

import { PlayListService } from './play-list.service';

describe('PlayListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayListService = TestBed.get(PlayListService);
    expect(service).toBeTruthy();
  });
});
