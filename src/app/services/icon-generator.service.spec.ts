/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IconGeneratorService } from './icon-generator.service';

describe('Service: IconGenerator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconGeneratorService]
    });
  });

  it('should ...', inject([IconGeneratorService], (service: IconGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
