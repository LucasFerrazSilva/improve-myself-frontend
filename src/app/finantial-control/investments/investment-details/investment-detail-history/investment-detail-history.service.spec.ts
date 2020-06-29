import { TestBed } from '@angular/core/testing';

import { InvestmentDetailHistoryService } from './investment-detail-history.service';

describe('InvestmentDetailHistoryService', () => {
  let service: InvestmentDetailHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentDetailHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
