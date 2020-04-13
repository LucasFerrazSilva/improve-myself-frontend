import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Expense } from './expense';
import { Observable } from 'rxjs';

const backendUrl = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  findById(id): Observable<Expense> {
    return this.http.get<Expense>(backendUrl + 'expense/' + id);
  }

  get(params) {
    return this.http.get(backendUrl + 'expense/', { params });
  }

  save(expense) {
    return this.http.post(backendUrl + 'expense/', expense, {responseType: 'text'});
  }

}
