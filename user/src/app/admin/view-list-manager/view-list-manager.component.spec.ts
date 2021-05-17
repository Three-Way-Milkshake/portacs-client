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

  it('setValues', () => {
    component.setValues(["0,0,0"]);
    expect(component.listManagerId[0]).toEqual("0");
    expect(component.listManagerName[0]).toEqual("0");
    expect(component.listManagerSurname[0]).toEqual("0");
  });

});
