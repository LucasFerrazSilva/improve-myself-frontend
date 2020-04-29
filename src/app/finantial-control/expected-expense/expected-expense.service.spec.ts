import { TestBed } from '@angular/core/testing';

import { ExpectedExpenseService } from './expected-expense.service';

describe('ExpectedExpenseService', () => {
  let service: ExpectedExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpectedExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
