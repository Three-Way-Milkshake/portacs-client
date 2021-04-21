import { TestBed } from '@angular/core/testing';

import { ManualdrivingService } from './manualdriving.service';

describe('ManualdrivingService', () => {
  let service: ManualdrivingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualdrivingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
