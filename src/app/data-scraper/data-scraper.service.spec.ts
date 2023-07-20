import { TestBed } from '@angular/core/testing';

import { DataScraperService } from './data-scraper.service';

describe('DataScraperService', () => {
  let service: DataScraperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataScraperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
