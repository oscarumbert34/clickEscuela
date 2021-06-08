
import { TestBed, inject } from '@angular/core/testing';
import { LibraryServiceService } from './library-service.service';

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
