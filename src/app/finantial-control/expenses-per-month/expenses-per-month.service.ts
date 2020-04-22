import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExpensesPerMonth } from './expenses-per-month';
import { Observable } from 'rxjs';

const backendUrl = environment.backendUrl;
const endpoint = backendUrl + 'expenses-per-month/';

@Injectable({
  providedIn: 'root'
})
export class ExpensesPerMonthService {

  constructor(private http: HttpClient) { }

  list(year): Observable<ExpensesPerMonth[]> {
    return this.http.get<ExpensesPerMonth[]>(endpoint + year);
  }

}
