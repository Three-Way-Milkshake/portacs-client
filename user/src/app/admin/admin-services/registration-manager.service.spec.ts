import { TestBed } from '@angular/core/testing';

import { RegistrationManagerService } from './registration-manager.service';

describe('RegistrationManagerService', () => {
  let service: RegistrationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
