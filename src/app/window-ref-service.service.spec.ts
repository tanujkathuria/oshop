import { TestBed, inject } from '@angular/core/testing';

import { WindowRefServiceService } from './window-ref-service.service';

describe('WindowRefServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefServiceService]
    });
  });

  it('should be created', inject([WindowRefServiceService], (service: WindowRefServiceService) => {
    expect(service).toBeTruthy();
  }));
});
