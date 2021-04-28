import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListManagerComponent } from './view-list-manager.component';

describe('ViewListManagerComponent', () => {
  let component: ViewListManagerComponent;
  let fixture: ComponentFixture<ViewListManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
