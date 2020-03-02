import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const backendUrl = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(backendUrl + 'expense/');
  }

}
