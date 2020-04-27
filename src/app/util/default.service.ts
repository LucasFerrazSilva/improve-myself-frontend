import { HttpClient } from '@angular/common/http';
import { Expense } from '../finantial-control/expenses/expense';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DefaultService<T> {

    protected endpoint: string;
    protected http: HttpClient;


    findById(id): Observable<T> {
        return this.http.get<T>(this.endpoint + id);
    }

    get(params) {
        return this.http.get(this.endpoint, { params });
    }

    save(obj) {
        return this.http.post(this.endpoint, obj, { responseType: 'text' });
    }

    delete(id) {
        return this.http.delete(this.endpoint + id, { responseType: 'text' });
    }

    findAll() {
        return this.http.get<T>(this.endpoint + 'find-all');
    }

}