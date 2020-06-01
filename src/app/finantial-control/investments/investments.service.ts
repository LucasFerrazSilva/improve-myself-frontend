import { Injectable } from '@angular/core';
import { Investment } from './investment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DefaultService } from 'src/app/util/default.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService extends DefaultService<Investment> {

  constructor(private http2: HttpClient) {
    super();
    super.endpoint = environment.backendUrl + 'investment/';
    super.http = this.http2;
  }

}
