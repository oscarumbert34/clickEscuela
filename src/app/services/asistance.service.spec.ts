/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsistanceService } from './asistance.service';

describe('Service: Asistance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsistanceService]
    });
  });

  it('should ...', inject([AsistanceService], (service: AsistanceService) => {
    expect(service).toBeTruthy();
  }));
});
