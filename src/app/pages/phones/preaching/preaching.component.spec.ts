import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreachingComponent } from './preaching.component';

describe('PreachingComponent', () => {
  let component: PreachingComponent;
  let fixture: ComponentFixture<PreachingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreachingComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
