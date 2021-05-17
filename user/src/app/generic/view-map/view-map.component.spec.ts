import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMapComponent } from './view-map.component';

describe('ViewMapComponent', () => {
  let component: ViewMapComponent;
  let fixture: ComponentFixture<ViewMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setPOI', () => {
    component.setPOI(["0,0,0,0,0"])
    expect(component.listPOIx[0]).toEqual(0);
    expect(component.listPOIy[0]).toEqual(0);
    expect(component.listPOIt[0]).toEqual("0");
    expect(component.listPOIID[0]).toEqual("0");
    expect(component.listPOIName[0]).toEqual("0");
  });
  
  

  it('setValues', () => {
    component.setValues("0");
    expect(component.tmp).toBeTruthy();
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
  it('typeSToMap', () => {
    expect(component.typeToMap("10")).toEqual("-1");
  });

  it('isPOI', () => {
    component.listPOIx[0]=0;
    component.listPOIy[0]=0;
    expect(component.isPOI(0,0)).toEqual(true);
  });
  it('isPOI', () => {
    component.listPOIx[0]=0;
    component.listPOIy[0]=0;
    expect(component.isPOI(1,0)).toEqual(false);
  });


  it('isBase', () => {
    component.listPOIName = (["p11"]);
    component.listPOIt = (["2"]);
    expect(component.isBase("p11")).toEqual(true);
  });
  
});
