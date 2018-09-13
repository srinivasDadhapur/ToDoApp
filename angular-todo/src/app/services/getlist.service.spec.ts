import { TestBed, inject } from '@angular/core/testing';

import { GetlistService } from './getlist.service';

describe('GetlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetlistService]
    });
  });

  it('should be created', inject([GetlistService], (service: GetlistService) => {
    expect(service).toBeTruthy();
  }));
});
