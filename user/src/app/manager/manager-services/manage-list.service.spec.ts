import { TestBed } from '@angular/core/testing';

import { ManageListService } from './manage-list.service';

describe('ManageListService', () => {
  let service: ManageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
