import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from './expense';
import { ExpensesService } from './expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  
  defaultPageSize = 5;

  dataSource = new MatTableDataSource<Expense>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  totalElements = 0;
  

  constructor(private service: ExpensesService) { }


  ngOnInit(): void {
    this._find();

    this.paginator.page.subscribe(page => this._find(page));
  }

  private _find(page?) {
    this.service.get(this._buildHttpParams(page)).subscribe(
      resp => {
        this.dataSource.data = resp['content'];
        this.totalElements = resp['totalElements'];
      }, 
      err => console.log(err)
    );
  }

  private _buildHttpParams(page = this.paginator) {
    let pageSize = page.pageSize || this.defaultPageSize;
    let pageIndex = page.pageIndex || 0;

    let params = new HttpParams();

    params = params.append('size', pageSize.toString());
    params = params.append('page', pageIndex.toString());

    return params;
  }

}
