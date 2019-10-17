import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMusicComponent } from './find-music.component';

describe('FindMusicComponent', () => {
  let component: FindMusicComponent;
  let fixture: ComponentFixture<FindMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
