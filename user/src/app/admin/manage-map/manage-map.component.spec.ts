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

  it('setValues', () => {
    component.setValues("0");
    expect(component.tmp).toBeTruthy("0");
  });

  it('pressedButton', () => {
    component.pressedButton(1,2);
    expect(component.displaySelection).toEqual(true);
    expect(component.lastButtonI).toEqual(1);
    expect(component.lastButtonJ).toEqual(2);
  });
  it('setPOI', () => {
    component.setPOI(["0,0,0,0,0"]);
    expect(component.listPOIID[0]).toEqual("0");
    expect(component.listPOIt[0]).toEqual("0");
    expect(component.listPOIx[0]).toEqual(0);
    expect(component.listPOIy[0]).toEqual(0);
    expect(component.listPOIName[0]).toEqual("0");
  });

  it('addTempPOI', () => {
    component.addTempPOI(0,0,0,0,0,"0");
    expect(component.tmpPOI[0]).toEqual({x : 0, y : 0, a : 0, id : 0, t : 0, name: "0"});    
  });
  it('addTempCell', () => {
    component.addTempCell(0,0,0);
    expect(component.tmpCell[0]).toEqual({x : 0, y : 0, a : 0});    
  });

  it('typeToEnum', () => {
    expect(component.typeToEnum("carico")).toEqual(0);
  });
  it('typeToEnum', () => {
    expect(component.typeToEnum("scarico")).toEqual(1);
  });
  it('typeToEnum', () => {
    expect(component.typeToEnum("uscita")).toEqual(2);
  });
  it('typeToEnum', () => {
    expect(component.typeToEnum("a")).toEqual(-1);
  });

  it('typeStringToMap', () => {
    expect(component.typeStringToMap("carico")).toEqual("20");
  });
  it('typeStringToMap', () => {
    expect(component.typeStringToMap("scarico")).toEqual("21");
  });
  it('typeStringToMap', () => {
    expect(component.typeStringToMap("uscita")).toEqual("22");
  });
  it('typeStringToMap', () => {
    expect(component.typeStringToMap("a")).toEqual("-1");
  });
});
