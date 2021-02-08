import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiPageComponent } from './ki-page.component';

describe('KiPageComponent', () => {
  let component: KiPageComponent;
  let fixture: ComponentFixture<KiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KiPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
