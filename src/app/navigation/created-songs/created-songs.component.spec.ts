import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedSongsComponent } from './created-songs.component';

describe('CreatedSongsComponent', () => {
  let component: CreatedSongsComponent;
  let fixture: ComponentFixture<CreatedSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
