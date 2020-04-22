import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ExpensesPerMonth } from './expenses-per-month';
import { ExpensesPerMonthService } from './expenses-per-month.service';
import { debounceTime } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-expenses-per-month',
  templateUrl: './expenses-per-month.component.html',
  styleUrls: ['./expenses-per-month.component.css']
})
export class ExpensesPerMonthComponent implements OnInit {

  debounce: Subject<string> = new Subject<string>();
  
  months = [
    {name: 'JANUARY', label: 'Janeiro (R$)', totalValue: 0},
    {name: 'FEBRUARY', label: 'Fevereiro (R$)', totalValue: 0},
    {name: 'MARCH', label: 'Março (R$)', totalValue: 0},
    {name: 'APRIL', label: 'Abril (R$)', totalValue: 0},
    {name: 'MAY', label: 'Maio (R$)', totalValue: 0},
    {name: 'JUNE', label: 'Junho (R$)', totalValue: 0},
    {name: 'JULY', label: 'Julho (R$)', totalValue: 0},
    {name: 'AUGUST', label: 'Agosto (R$)', totalValue: 0},
    {name: 'SEPTEMBER', label: 'Setembro (R$)', totalValue: 0},
    {name: 'OCTOBER', label: 'Outubro (R$)', totalValue: 0},
    {name: 'NOVEMBER', label: 'Novembro (R$)', totalValue: 0},
    {name: 'DECEMBER', label: 'Dezembro (R$)', totalValue: 0}
  ];

  years = [2019, 2020, 2021];
  filterYear = {label: 'Ano', fieldName: 'year', value: 2020};

  yearTotalValue = 0;

  displayedColumns;

  dataSource = new MatTableDataSource<ExpensesPerMonth>();

  totalElements = 0;


  constructor(
    private service: ExpensesPerMonthService,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {    
    this.find();

    this.displayedColumns = ['category'];
    this.months.forEach(month => this.displayedColumns.push(month.name));
    this.displayedColumns.push('totalValue');

    this.debounce.pipe(debounceTime(500)).subscribe(() => {
      this.find();
    });
  }


  find() {
    this._initMonths();
    this.service.list(this.filterYear.value).subscribe(
      resp => {
        this.dataSource.data = resp;
        this.totalElements = resp.length;

        this._setMonthsValues(resp);        
      }, 
      err => this.snackBar.open(err.error, 'x', { duration: 2000 })
    );
  }

  private _setMonthsValues(elements) {
    this._initMonths();
    elements.forEach(expensesPerMonth => {
      const values = expensesPerMonth.values;
      this.months.forEach(month => {
        month.totalValue += values[month.name];
        this.yearTotalValue += values[month.name];
      });
    });
  }

  private _initMonths() {
    this.months.forEach(month => month.totalValue = 0);

    this.yearTotalValue = 0;
  }

}
