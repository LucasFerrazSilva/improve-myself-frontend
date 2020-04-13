import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from './expense';
import { ExpensesService } from './expenses.service';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseFormDialogComponent } from './expense-form-dialog/expense-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, AfterViewInit {

  debounce: Subject<string> = new Subject<string>();
  
  filters = [
    {label: 'Nome', fieldName: 'name', value: ''},
    {label: 'Valor', fieldName: 'amount', value: ''}
  ];
  
  dataSource = new MatTableDataSource<Expense>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultPageSize = 5;
  totalElements = 0;


  constructor(
    private service: ExpensesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
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
    console.log(this.filters);
    const httpParams = this._buildHttpParams(page);
    
    this.service.get(httpParams).subscribe(
      resp => {
        this.dataSource.data = resp['content'];
        this.totalElements = resp['totalElements'];

        console.log(resp);
      }, 
      err => console.log(err)
    );
  }

  edit(element) {
    this.openDialog(element.id);
  }

  delete(element) {
    this.service.delete(element.id).subscribe(
      result => {
        this.snackBar.open(result.toString(), 'x', { duration: 2000 });
        this.find();
      },
      err => {
        console.log(err);
        this.snackBar.open(err.error, 'x', { duration: 2000 });
      }
    );
  }

  openDialog(id = null) {
    const dialogRef = this.dialog.open(
      ExpenseFormDialogComponent,
      {
        width: '250px',
        data: {id}
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if (result) {
          this.service.save(result).subscribe(
            response => {
              this.snackBar.open('Salvo com sucesso', 'x', { duration: 2000 });
              this.find();
            },
            err => {
              this.snackBar.open('Erro ao salvar', 'x', { duration: 2000 });
            }
          );
        }
      }
    );
  }

  private _buildHttpParams(page = this.paginator) {
    const pageSize = page.pageSize || this.defaultPageSize;
    const pageIndex = page.pageIndex || 0;

    const sort = this.sort.active || 'name';
    const sortDirection = this.sort.direction || 'asc';

    let params = new HttpParams();

    params = params.append('size', pageSize.toString());
    params = params.append('page', pageIndex.toString());

    params = params.append('sort', sort + ',' + sortDirection);

    this.filters.forEach(
      filter => params = params.append(filter.fieldName, filter.value)
    );


    return params;
  }

}
