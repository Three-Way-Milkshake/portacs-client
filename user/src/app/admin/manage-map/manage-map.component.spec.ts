import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMapComponent } from './manage-map.component';

describe('ManageMapComponent', () => {
  let component: ManageMapComponent;
  let fixture: ComponentFixture<ManageMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
