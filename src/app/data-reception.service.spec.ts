import { TestBed } from '@angular/core/testing';

import { DataReceptionService } from './data-reception.service';

describe('DataReceptionService', () => {
  let service: DataReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
