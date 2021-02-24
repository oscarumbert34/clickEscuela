/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProxyServiceService } from './proxyService.service';

describe('Service: ProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProxyServiceService]
    });
  });

  it('should ...', inject([ProxyServiceService], (service: ProxyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
