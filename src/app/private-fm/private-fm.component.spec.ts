import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFmComponent } from './private-fm.component';

describe('PrivateFmComponent', () => {
  let component: PrivateFmComponent;
  let fixture: ComponentFixture<PrivateFmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateFmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
