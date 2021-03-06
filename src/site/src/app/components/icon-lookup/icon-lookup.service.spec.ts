import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IconLookupService } from './icon-lookup.service';

describe('IconLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: IconLookupService = TestBed.get(IconLookupService);
    expect(service).toBeTruthy();
  });
});
