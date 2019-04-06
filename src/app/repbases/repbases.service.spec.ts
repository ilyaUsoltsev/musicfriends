import { TestBed } from '@angular/core/testing';

import { RepbasesService } from './repbases.service';

describe('RepbasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepbasesService = TestBed.get(RepbasesService);
    expect(service).toBeTruthy();
  });
});
