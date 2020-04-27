import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultService } from 'src/app/util/default.service';
import { environment } from 'src/environments/environment';
import { FinantialParameter } from './finantial-parameter';

const endpoint = environment.backendUrl + 'finantial-parameter/';

@Injectable({
  providedIn: 'root'
})
export class FinantialParametersService extends DefaultService<FinantialParameter> {

  constructor(private http2: HttpClient) {
    super();
    super.endpoint = environment.backendUrl + 'finantial-parameter/';
    super.http = this.http2;
  }

}
