import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnitComponent } from './list-unit.component';

describe('ListUnitComponent', () => {
  let component: ListUnitComponent;
  let fixture: ComponentFixture<ListUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should listunit', () => {
    component.listUnit[0] = "0";
    expect(component.listUnit[0]).toEqual("0");
  });
});
