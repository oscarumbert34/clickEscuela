/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LibraryServiceService } from './libraryService.service';

describe('Service: LibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibraryServiceService]
    });
  });

  it('should ...', inject([LibraryServiceService], (service: LibraryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
