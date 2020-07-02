import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { InvestmentDetailHistory } from './investment-detail-history';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvestmentDetailHistoryService } from './investment-detail-history.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import { DefaultDialogComponent } from 'src/app/util/default-dialog/default-dialog.component';
import { HttpParams } from '@angular/common/http';
import { Months } from 'src/app/util/month/months';

@Component({
  selector: 'app-investment-detail-history',
  templateUrl: './investment-detail-history.component.html',
  styleUrls: ['./investment-detail-history.component.css']
})
export class InvestmentDetailHistoryComponent implements OnInit {
  
  debounce: Subject<string> = new Subject<string>();
  
  filters = [
    {label: 'Ano', fieldName: 'year', value: ''}
  ];

  filterMonth = {label: 'Mês', fieldName: 'month', value: ''};

  @Input() investmentId;
  
  dataSource = new MatTableDataSource<InvestmentDetailHistory>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultPageSize = 5;
  totalElements = 0;

  months;


  constructor(
    private service: InvestmentDetailHistoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  
  ngOnInit(): void {
    this.months = new Months().values;

    this.find();

    this.paginator.page.subscribe(page => this.find(page));

    this.debounce.pipe(debounceTime(500)).subscribe(() => {
      this.paginator.firstPage();
      this.find();
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.find();
    });
  }

  find(page?) {
    const httpParams = this._buildHttpParams(page);
    
    this.service.get(httpParams).subscribe(
      resp => {
        this.dataSource.data = resp['content'];
        this.totalElements = resp['totalElements'];
      }, 
      err => this.snackBar.open(err.error, 'x', { duration: 2000 })
    );
  }

  edit(element) {
    this.openDialog(element.id);
  }

  delete(element) {
    const dialogRef = this.dialog.open(
      DefaultDialogComponent,
      {
        data: {
          tittle: 'Confirmar exclusão',
          message: 'Você tem certeza que deseja excluir esse registro?',
          cancelButtonText: 'Não',
          confirmButtonText: 'Sim'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.service.delete(element.id).subscribe(
            result => {
              this.snackBar.open(result.toString(), 'x', { duration: 2000 });
              this.find();
            },
            err => {
              this.snackBar.open(err.error, 'x', { duration: 2000 });
            }
          );
        }
      },
      err => {
        this.snackBar.open(err, 'x', { duration: 2000 });
      }
    );
    
  }

  openDialog(id = null) {
    // const dialogRef = this.dialog.open(
    //   ExpenseCategoryFormDialogComponent,
    //   {
    //     width: '400px',
    //     data: {id}
    //   }
    // );

    // dialogRef.afterClosed().subscribe(
    //   result => {
    //     if (result) {
    //       this.service.save(result).subscribe(
    //         response => {
    //           this.snackBar.open('Salvo com sucesso', 'x', { duration: 2000 });
    //           this.find();
    //         },
    //         err => {
    //           this.snackBar.open('Erro ao salvar', 'x', { duration: 2000 });
    //         }
    //       );
    //     }
    //   }
    // );
  }

  private _buildHttpParams(page = this.paginator) {
    const pageSize = page.pageSize || this.defaultPageSize;
    const pageIndex = page.pageIndex || 0;

    const sort = this.sort.active || 'year';
    const sortDirection = this.sort.direction || 'asc';

    let params = new HttpParams();

    params = params.append('size', pageSize.toString());
    params = params.append('page', pageIndex.toString());

    params = params.append('sort', sort + ',' + sortDirection);

    this.filters.forEach(
      filter => params = params.append(filter.fieldName, filter.value)
    );

    params = params.append('month', this.filterMonth.value);
    params = params.append('investmentId', this.investmentId);

    console.log(params);

    return params;
  }

  getMonthLabel(month: number) {
    const monthIndex = month - 1;

    return this.months[monthIndex].label;
  }

}
