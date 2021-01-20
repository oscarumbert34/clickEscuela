/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrimesterService } from './trimester.service';

describe('Service: Trimester', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrimesterService]
    });
  });

  it('should ...', inject([TrimesterService], (service: TrimesterService) => {
    expect(service).toBeTruthy();
  }));
});
