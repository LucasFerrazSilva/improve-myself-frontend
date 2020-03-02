import { Component, OnInit } from '@angular/core';
import { ExpensesService } from './expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  constructor(private service: ExpensesService) { }

  ngOnInit(): void {
    this.service.get().subscribe(
      resp => console.log(resp),
      err => console.log(err)
    );
  }

}
