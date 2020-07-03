import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { InvestmentsService } from '../investments.service';
import { Investment } from '../investment';
import { SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InvestmentFormDialogComponent } from '../investment-form-dialog/investment-form-dialog.component';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      resp => {
        this.investment = resp.investment;
        
        if(!this.investment)
          this.openDialog();
      },
      err => console.log(err)
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(
      InvestmentFormDialogComponent,
      {
        width: '400px',
        data: {id: this.investment?.id}
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.service.save(result).subscribe(
            response => {
              this.snackBar.open('Salvo com sucesso', 'x', { duration: 2000 });

              if(this.investment) {
                this.service.findById(this.investment.id).subscribe(
                  resp => this.investment = resp,
                  err => this.snackBar.open('Erro ao atualizar dados', 'x', { duration: 2000 })
                );
              } else {
                this.service.findByName(result.name).subscribe(
                  resp => this.router.navigate(['controle-financeiro/investimento', resp.id]),
                  err => this.snackBar.open('Erro ao atualizar dados', 'x', { duration: 2000 })
                );
                
              }
            },
            err => {
              this.snackBar.open('Erro ao salvar', 'x', { duration: 2000 });
            }
          );
        }
      }
    );
  }

}
