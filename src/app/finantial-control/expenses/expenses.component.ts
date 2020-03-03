import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from './expense';
import { ExpensesService } from './expenses.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, AfterViewInit {
  
  dataSource = new MatTableDataSource<Expense>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultPageSize = 5;
  totalElements = 0;


  constructor(private service: ExpensesService) { }


  ngOnInit(): void {
    this._find();

    this.paginator.page.subscribe(page => this._find(page));
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this._find();
    });
  }

  private _find(page?) {
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

  private _buildHttpParams(page = this.paginator) {
    const pageSize = page.pageSize || this.defaultPageSize;
    const pageIndex = page.pageIndex || 0;

    const sort = this.sort.active || 'name';
    const sortDirection = this.sort.direction || 'asc';

    let params = new HttpParams();

    params = params.append('size', pageSize.toString());
    params = params.append('page', pageIndex.toString());

    params = params.append('sort', sort + ',' + sortDirection);

    return params;
  }

}
