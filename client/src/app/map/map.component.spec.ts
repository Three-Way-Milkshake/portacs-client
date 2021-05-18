import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete', () => {
    component.delete()
    expect(component.listPOIID).toEqual([]);
  });

  it('savePOI', () => {
    component.savePOI("0,0,0,0,0")
    expect(component.listPOIx).toEqual([0]);
    expect(component.listPOIy).toEqual([0]);
    expect(component.listPOIt).toEqual(["0"]);
    expect(component.listPOIID).toEqual(["0"]);
    expect(component.listPOIName).toEqual(["0"]);
  });

  it('setValues', () => {
    component.setValues("0")
    expect(component.tmp[0]).toEqual(["7"]);
  });
  it('typeToMap', () => {
    expect(component.typeToMap("0")).toEqual("20");
  });
  it('typeToMap', () => {
    expect(component.typeToMap("1")).toEqual("21");
  });
  it('typeToMap', () => {
    expect(component.typeToMap("2")).toEqual("22");
  });
  it('typeToMap', () => {
    expect(component.typeToMap("10")).toEqual("-1");
  });

  it('dirToIntArray', () => {
    component.pos.dir = 0;
    expect(component.dirToIntArray()).toEqual("7");
  });

  it('dirToIntArray', () => {
    component.pos.dir = 1;
    expect(component.dirToIntArray()).toEqual("8");
  });

  it('dirToIntArray', () => {
    component.pos.dir = 2;
    expect(component.dirToIntArray()).toEqual("9");
  });

  it('dirToIntArray', () => {
    component.pos.dir = 3;
    expect(component.dirToIntArray()).toEqual("10");
  });

  it('dirToIntArray', () => {
    component.pos.dir = 10;
    expect(component.dirToIntArray()).toEqual("-");
  });

  it('changePosition', () => {
    component.changePosition("0,0,0")
    expect(component.pos.posX).toEqual(0);
  });
});
