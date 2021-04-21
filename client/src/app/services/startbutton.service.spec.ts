import { TestBed } from '@angular/core/testing';

import { StartbuttonService } from './startbutton.service';

describe('StartbuttonService', () => {
  let service: StartbuttonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartbuttonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
