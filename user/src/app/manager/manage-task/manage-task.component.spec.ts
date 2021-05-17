import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTaskComponent } from './manage-task.component';

describe('ManageTaskComponent', () => {
  let component: ManageTaskComponent;
  let fixture: ComponentFixture<ManageTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('confermation', () => {
    component.confermation("OK")
    expect(component.added).toEqual(true);
  });

  it('add', () => {
    //component.newList = (["p11"]);   
    component.add("p12");
    expect(component.newList[0]).toEqual("p12");
  });

  it('typeToName', () => {
    expect(component.typeToName(0)).toEqual("Carico");
  });
  it('typeToName', () => {
    expect(component.typeToName(1)).toEqual("Scarico");
  });
  it('typeToName', () => {
    expect(component.typeToName(2)).toEqual("Base");
  });
  it('typeToName', () => {
    expect(component.typeToName(5)).toEqual("");
  });

  it('setValues', () => {
    component.setValues(["0"])
    expect(component.poi).toEqual(["0"]);
  });
  
});
