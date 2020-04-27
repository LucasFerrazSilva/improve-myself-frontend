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
import { DefaultDialogComponent } from 'src/app/util/default-dialog/default-dialog.component';
import { ExpenseCategoryService } from '../expenses-categories/expense-category.service';
import { Months } from 'src/app/util/month/months';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, AfterViewInit {

  categories;

  debounce: Subject<string> = new Subject<string>();
  
  filters = [
    {label: 'Descrição', fieldName: 'name', value: ''},
    {label: 'Valor', fieldName: 'amount', value: ''}
  ];
  filterData = {label: 'Data', fieldName: 'expenseDate', value: null};
  filterCategory = {label: 'Categoria', fieldName: 'categoryId', value: ''};
  filterYear = {label: 'Ano', fieldName: 'expenseDateYear', value: 2020};
  filterMonth = {label: 'Mês', fieldName: 'expenseDateMonth', value: ''};

  years = [2019, 2020, 2021];
  months = new Months().values;

  tableFields = [
    {name: 'name', label: 'Descrição'},
    {name: 'amount', label: 'Valor (R$)'},
    {name: 'expenseDate', label: 'Data'}
  ];
  
  dataSource = new MatTableDataSource<Expense>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultPageSize = 5;
  totalElements = 0;


  constructor(
    private service: ExpensesService,
    private categoryService: ExpenseCategoryService,
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
      ExpenseFormDialogComponent,
      {
        width: '350px',
        data: {id}
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          result.expenseDate = result.expenseDate.toLocaleDateString('en-GB');
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

    const sort = this.sort.active || 'name';
    const sortDirection = this.sort.direction || 'asc';

    let params = new HttpParams();

    params = params.append('size', pageSize.toString());
    params = params.append('page', pageIndex.toString());

    params = params.append('sort', sort + ',' + sortDirection);

    this.filters.forEach(
      filter => params = params.append(filter.fieldName, filter.value)
    );

    params = params.append(this.filterData.fieldName, this.filterData.value?.toLocaleDateString('en-GB'));
    params = params.append(this.filterCategory.fieldName, this.filterCategory.value);
    params = params.append(this.filterYear.fieldName, this.filterYear.value?.toString());
    params = params.append(this.filterMonth.fieldName, (this.filterMonth.value ? this.filterMonth.value : ''));

    console.log(params);
    
    return params;
  }

}
