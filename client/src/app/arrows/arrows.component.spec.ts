import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowsComponent } from './arrows.component';

describe('ArrowsComponent', () => {
  let component: ArrowsComponent;
  let fixture: ComponentFixture<ArrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateArrows', () => {
    component.updateArrows("2")
    expect(component.dir).toEqual([false, false, true, false]);
  });

  it('updateArrows', () => {
    component.updateArrows("3")
    expect(component.dir).toEqual([true, false, false, false]);
  });

  it('updateArrows', () => {
    component.updateArrows("1")
    expect(component.dir).toEqual([false, true, false, false]);
  });

  it('updateArrows', () => {
    component.updateArrows("4")
    expect(component.dir).toEqual([false, false, false, false]);
  });

  it('updateArrows', () => {
    component.updateArrows("0")
    expect(component.dir).toEqual([false, false, false, true]);
  });


});
