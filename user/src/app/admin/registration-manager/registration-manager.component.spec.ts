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
});
