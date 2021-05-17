import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationManagerComponent } from './registration-manager.component';

describe('RegistrationManagerComponent', () => {
  let component: RegistrationManagerComponent;
  let fixture: ComponentFixture<RegistrationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept name', () => {
    component.name="Mario"
    expect(component.name).toEqual("Mario");
  });
  it('should accept surname', () => {
    component.surname="Mario"
    expect(component.surname).toEqual("Mario");
  });
  it('should accept id', () => {
    component.id="Mario"
    expect(component.id).toEqual("Mario");
  });
  it('should accept pwd', () => {
    component.pwd="Mario"
    expect(component.pwd).toEqual("Mario");
  });


});

