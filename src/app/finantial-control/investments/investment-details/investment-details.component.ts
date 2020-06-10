import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { InvestmentsService } from '../investments.service';
import { Investment } from '../investment';
import { SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-investment-details',
  templateUrl: './investment-details.component.html',
  styleUrls: ['./investment-details.component.css']
})
export class InvestmentDetailsComponent implements OnInit {

  investment: Investment;

  constructor(
    private route: ActivatedRoute,
    private service: InvestmentsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.service.findById(id).subscribe(
      result => {
        this.investment = result;
      },
      err => {
        this.snackBar.open(err.error, 'x', { duration: 2000 });
      }
    );
  }

}
