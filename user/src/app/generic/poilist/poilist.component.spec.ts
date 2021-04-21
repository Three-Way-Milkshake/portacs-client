import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POIListComponent } from './poilist.component';

describe('POIListComponent', () => {
  let component: POIListComponent;
  let fixture: ComponentFixture<POIListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ POIListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(POIListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
