import { TestBed } from '@angular/core/testing';

import { FinantialParametersService } from './finantial-parameters.service';

describe('FinantialParametersService', () => {
  let service: FinantialParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinantialParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
