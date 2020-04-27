import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultService } from 'src/app/util/default.service';
import { environment } from 'src/environments/environment';
import { ExpenseCategory } from './expense-category';


@Injectable({
    providedIn: 'root'
})
export class ExpenseCategoryService extends DefaultService<ExpenseCategory> {

  constructor(private http2: HttpClient) {
    super();
    super.endpoint = environment.backendUrl + 'expense-category/';
    super.http = this.http2;
  }

}