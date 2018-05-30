import { TestBed, inject } from '@angular/core/testing';

import { EventBrokerService } from './event-broker.service';

describe('EventBrokerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBrokerService]
    });
  });

  it('should be created', inject([EventBrokerService], (service: EventBrokerService) => {
    expect(service).toBeTruthy();
  }));
});
