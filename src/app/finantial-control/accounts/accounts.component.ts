import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DefaultDialogComponent } from 'src/app/util/default-dialog/default-dialog.component';
import { Account } from './account';
import { AccountsService } from './accounts.service';
import { AccountFormDialogComponent } from './account-form-dialog/account-form-dialog.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  
  debounce: Subject<string> = new Subject<string>();
  
  filters = [
    {label: 'Nome', fieldName: 'name', value: ''}
  ];
  
  dataSource = new MatTableDataSource<Account>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultPageSize = 5;
  totalElements = 0;


  constructor(
    private service: AccountsService,
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
      AccountFormDialogComponent,
      {
        width: '400px',
        data: {id}
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
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
