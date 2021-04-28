import { TestBed } from '@angular/core/testing';

import { ViewListManagerService } from './view-list-manager.service';

describe('ViewListManagerService', () => {
  let service: ViewListManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewListManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
