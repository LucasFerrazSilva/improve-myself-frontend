import { Injectable } from '@angular/core';
import { Account } from './account';
import { DefaultService } from 'src/app/util/default.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends DefaultService<Account> {

  constructor(private http2: HttpClient) {
    super();
    super.endpoint = environment.backendUrl + 'account/';
    super.http = this.http2;
  }
}
