import { TestBed } from '@angular/core/testing';

import { ExpensesPerMonthService } from './expenses-per-month.service';

describe('ExpensesPerMonthService', () => {
  let service: ExpensesPerMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesPerMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
