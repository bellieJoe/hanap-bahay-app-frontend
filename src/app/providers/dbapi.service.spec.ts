import { TestBed } from '@angular/core/testing';

import { DbapiService } from './dbapi.service';

describe('DbapiService', () => {
  let service: DbapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
