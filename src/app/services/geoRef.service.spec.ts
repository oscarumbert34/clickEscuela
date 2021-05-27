/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeoRefService } from './geoRef.service';

describe('Service: Province', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoRefService]
    });
  });

  it('should ...', inject([GeoRefService], (service: GeoRefService) => {
    expect(service).toBeTruthy();
  }));
});
