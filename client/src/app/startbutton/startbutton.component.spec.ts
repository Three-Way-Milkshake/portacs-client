import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartButtonComponent } from './startbutton.component';

describe('StartButtonComponent', () => {
  let component: StartButtonComponent;
  let fixture: ComponentFixture<StartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('list', () => {
    component.start();
    expect(component.isReqList).toEqual(false);
  });

  it('start', () => {
    component.start();
    expect(component.isOnScreen).toEqual(false);
  });
});
