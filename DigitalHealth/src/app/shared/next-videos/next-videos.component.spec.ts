import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextVideosComponent } from './next-videos.component';

describe('NextVideosComponent', () => {
  let component: NextVideosComponent;
  let fixture: ComponentFixture<NextVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
