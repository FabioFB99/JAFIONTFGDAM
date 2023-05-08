import { TestBed } from '@angular/core/testing';

import { ClasedataService } from './clasedata.service';

describe('ClasedataService', () => {
  let service: ClasedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
