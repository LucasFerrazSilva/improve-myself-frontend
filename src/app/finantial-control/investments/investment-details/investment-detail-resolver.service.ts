import { Observable } from 'rxjs';
import { Investment } from '../investment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { InvestmentsService } from '../investments.service';

@Injectable({ providedIn: 'root'})
export class InvestmentResolver implements Resolve<Observable<Investment>> {

    constructor(
        private service: InvestmentsService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Investment> {
        const id = route.params.id;

        return this.service.findById(id);
    }
    
}