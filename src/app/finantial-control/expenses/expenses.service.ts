import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const backendUrl = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  get(params) {
    return this.http.get(backendUrl + 'expense/', { params });
  }

}
