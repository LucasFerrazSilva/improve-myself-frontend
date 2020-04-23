import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ExpensesPerMonth } from './expenses-per-month';
import { ExpensesPerMonthService } from './expenses-per-month.service';
import { debounceTime } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Months } from 'src/app/util/month/months';
import { MonthWithValue } from './month-with-value';

@Component({
  selector: 'app-expenses-per-month',
  templateUrl: './expenses-per-month.component.html',
  styleUrls: ['./expenses-per-month.component.css']
})
export class ExpensesPerMonthComponent implements OnInit {

  debounce: Subject<string> = new Subject<string>();
  
  monthsWithValues: MonthWithValue[] = [];

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
    this._initMonths();
    this.find();

    this.displayedColumns = ['category'];

    this.monthsWithValues.forEach(monthWithValue => this.displayedColumns.push(monthWithValue.month.name));

    this.displayedColumns.push('totalValue');

    this.debounce.pipe(debounceTime(500)).subscribe(() => {
      this.find();
    });
  }


  find() {
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
    this._resetMonthsValues();

    elements.forEach(expensesPerMonth => {
      const values = expensesPerMonth.values;
      this.monthsWithValues.forEach(monthWithValues => {
        monthWithValues.totalValue += values[monthWithValues.month.name];

        this.yearTotalValue += values[monthWithValues.month.name];
        this.yearTotalValue = Number.parseFloat(this.yearTotalValue.toFixed(2));
      });
    });
  }

  private _initMonths() {
    new Months().values.forEach(month => {
      this.monthsWithValues.push({month: month, totalValue: 0});
    });
  }

  private _resetMonthsValues() {
    this.monthsWithValues.forEach(monthsWithValues => monthsWithValues.totalValue = 0);

    this.yearTotalValue = 0;
  }

}
