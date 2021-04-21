import { TestBed } from '@angular/core/testing';

import { ManageMapService } from './manage-map.service';

describe('ManageMapService', () => {
  let service: ManageMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
