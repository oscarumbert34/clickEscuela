/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsistanceParentService } from './asistance-parent.service';

describe('Service: AsistanceParent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsistanceParentService]
    });
  });

  it('should ...', inject([AsistanceParentService], (service: AsistanceParentService) => {
    expect(service).toBeTruthy();
  }));
});
