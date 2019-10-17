import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingPreviewComponent } from './playing-preview.component';

describe('PlayingPreviewComponent', () => {
  let component: PlayingPreviewComponent;
  let fixture: ComponentFixture<PlayingPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
