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

  it('setValues', () => {
    component.setValues(["0,0,0"]);
    expect(component.list[0]).toEqual("ID: 0, Nome: 0, Tipo: Carico");
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
    expect(component.typeToName(10)).toEqual("");
  });
});
