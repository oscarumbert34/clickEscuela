/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatmessagesService } from './chatmessages.service';

describe('Service: Chatmessages', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatmessagesService]
    });
  });

  it('should ...', inject([ChatmessagesService], (service: ChatmessagesService) => {
    expect(service).toBeTruthy();
  }));
});
