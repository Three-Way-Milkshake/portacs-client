import { TestBed } from '@angular/core/testing';

import { POIListService } from './poilist.service';

describe('POIListService', () => {
  let service: POIListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(POIListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
