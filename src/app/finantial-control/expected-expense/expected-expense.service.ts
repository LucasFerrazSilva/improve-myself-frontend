import { Injectable } from '@angular/core';
import { DefaultService } from 'src/app/util/default.service';
import { ExpectedExpense } from './expected-expense';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpectedExpenseService extends DefaultService<ExpectedExpense> {

  constructor(private http2: HttpClient) {
    super();
    super.endpoint = environment.backendUrl + 'expected-expense/';
    super.http = this.http2;
  }
  
}
