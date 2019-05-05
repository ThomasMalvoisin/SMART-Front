import { TestBed } from '@angular/core/testing';

import { BusLineService } from './bus-line.service';

describe('BusLineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusLineService = TestBed.get(BusLineService);
    expect(service).toBeTruthy();
  });
});
