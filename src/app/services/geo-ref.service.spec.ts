import { TestBed, inject } from '@angular/core/testing';
import { GeoRefService } from './geo-ref.service';

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
