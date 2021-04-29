import { TestBed } from '@angular/core/testing';

import { ListUnitService } from './list-unit.service';

describe('ListUnitService', () => {
  let service: ListUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
