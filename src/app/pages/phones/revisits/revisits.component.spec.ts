import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisitsComponent } from './revisits.component';

describe('RevisitsComponent', () => {
  let component: RevisitsComponent;
  let fixture: ComponentFixture<RevisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevisitsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
