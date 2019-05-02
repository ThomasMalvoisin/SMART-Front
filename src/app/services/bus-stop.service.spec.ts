import { TestBed } from '@angular/core/testing';

import { BusStopService } from './bus-stop.service';

describe('BusStopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusStopService = TestBed.get(BusStopService);
    expect(service).toBeTruthy();
  });
});
