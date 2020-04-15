import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Expense } from './expense';
import { Observable } from 'rxjs';

const backendUrl = environment.backendUrl;
const endpoint = backendUrl + 'expense/';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  findById(id): Observable<Expense> {
    return this.http.get<Expense>(endpoint + id);
  }

  get(params): Observable<Expense> {
    return this.http.get<Expense>(endpoint, { params });
  }

  save(expense) {
    return this.http.post(endpoint, expense, {responseType: 'text'});
  }

  delete(id) {
    return this.http.delete(endpoint + id, { responseType: 'text' });
  }

}
