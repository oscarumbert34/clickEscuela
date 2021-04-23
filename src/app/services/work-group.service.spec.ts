/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkGroupService } from './work-group.service';

describe('Service: WorkGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkGroupService]
    });
  });

  it('should ...', inject([WorkGroupService], (service: WorkGroupService) => {
    expect(service).toBeTruthy();
  }));
});
