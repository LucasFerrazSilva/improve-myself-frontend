import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultService } from 'src/app/util/default.service';
import { environment } from 'src/environments/environment';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService extends DefaultService<Expense> {

  constructor(private http2: HttpClient) {
    super();
    super.endpoint = environment.backendUrl + 'expense/';
    super.http = this.http2;
  }

}
