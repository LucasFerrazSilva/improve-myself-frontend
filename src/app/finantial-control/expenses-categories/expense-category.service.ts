import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExpenseCategory } from './expense-category';
import { Observable } from 'rxjs';

const backendUrl = environment.backendUrl;
const endpoint = backendUrl + 'expense-category/';

@Injectable({
    providedIn: 'root'
})
export class ExpenseCategoryService {

    constructor(private http: HttpClient) { }
  
    findById(id): Observable<ExpenseCategory> {
      return this.http.get<ExpenseCategory>(endpoint + id);
    }
  
    get(params) {
      return this.http.get(endpoint, { params });
    }

    findAll() {
      return this.http.get<ExpenseCategory>(endpoint + 'find-all');
    }
  
    save(category) {
      return this.http.post(endpoint, category, {responseType: 'text'});
    }
  
    delete(id) {
      return this.http.delete(endpoint + id, { responseType: 'text' });
    }
}