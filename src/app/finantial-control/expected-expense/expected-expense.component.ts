import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ExpectedExpense } from './expected-expense';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExpectedExpenseService } from './expected-expense.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import { DefaultDialogComponent } from 'src/app/util/default-dialog/default-dialog.component';
import { HttpParams } from '@angular/common/http';
import { ExpectedExpenseFormDialogComponent } from './expected-expense-form-dialog/expected-expense-form-dialog.component';
import { ExpenseCategoryService } from '../expenses-categories/expense-category.service';

@Component({
  selector: 'app-expected-expense',
  templateUrl: './expected-expense.component.html',
  styleUrls: ['./expected-expense.component.css']
})
export class ExpectedExpenseComponent implements OnInit, AfterViewInit {
  
  debounce: Subject<string> = new Subject<string>();
  
  filters = [];
  filterCategory = {label: 'Categoria', fieldName: 'categoryId', value: ''};

  categories;
  
  dataSource = new MatTableDataSource<ExpectedExpense>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultPageSize = 5;
  totalElements = 0;


  constructor(
    private service: ExpectedExpenseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categoryService: ExpenseCategoryService
  ) { }

  
  ngOnInit(): void {
    this.find();

    this.paginator.page.subscribe(page => this.find(page));

    this.debounce.pipe(debounceTime(500)).subscribe(() => {
      this.paginator.firstPage();
      this.find();
    });
    
    this.categoryService.findAll().subscribe(
      result => {
        this.categories = result;
      },
      err => {
        this.snackBar.open('Erro ao buscar categorias', 'x', { duration: 2000 });
      }
    );
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
    const dialogRef = this.dialog.open(
      ExpectedExpenseFormDialogComponent,
      {
        width: '400px',
        data: {id}
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          result.category = {id: result.category};
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

    const sort = this.sort.active || 'category.name';
    const sortDirection = this.sort.direction || 'asc';

    let params = new HttpParams();

    params = params.append('size', pageSize.toString());
    params = params.append('page', pageIndex.toString());

    params = params.append('sort', sort + ',' + sortDirection);

    this.filters.forEach(
      filter => params = params.append(filter.fieldName, filter.value)
    );

    params = params.append(this.filterCategory.fieldName, (this.filterCategory.value ? this.filterCategory.value : ''));

    return params;
  }

}
