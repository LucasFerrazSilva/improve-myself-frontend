import { Injectable } from '@angular/core';
import { DefaultService } from 'src/app/util/default.service';
import { InvestmentDetailHistory } from './investment-detail-history';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentDetailHistoryService extends DefaultService<InvestmentDetailHistory> {

  constructor(private http2: HttpClient) {
    super();
    super.endpoint = environment.backendUrl + 'investment/history/';
    super.http = this.http2;
  }

}
