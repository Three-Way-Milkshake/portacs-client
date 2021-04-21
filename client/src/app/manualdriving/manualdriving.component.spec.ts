import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDrivingComponent } from './manualdriving.component';

describe('ManualDrivingComponent', () => {
  let component: ManualDrivingComponent;
  let fixture: ComponentFixture<ManualDrivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualDrivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDrivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
