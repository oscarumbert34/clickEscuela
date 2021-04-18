/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportCardService } from './reportCard.service';

describe('Service: ReportCard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportCardService]
    });
  });

  it('should ...', inject([ReportCardService], (service: ReportCardService) => {
    expect(service).toBeTruthy();
  }));
});
