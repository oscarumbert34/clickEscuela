/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendarEventsService } from './calendar-events.service';

describe('Service: CalendarEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarEventsService]
    });
  });

  it('should ...', inject([CalendarEventsService], (service: CalendarEventsService) => {
    expect(service).toBeTruthy();
  }));
});
