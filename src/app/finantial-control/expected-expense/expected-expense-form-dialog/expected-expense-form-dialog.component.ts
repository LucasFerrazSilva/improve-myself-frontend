import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpectedExpenseService } from '../expected-expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpectedExpenseType } from '../expected-expense-type';
import { ExpenseCategoryService } from '../../expenses-categories/expense-category.service';

@Component({
  selector: 'app-expected-expense-form-dialog',
  templateUrl: './expected-expense-form-dialog.component.html',
  styleUrls: ['./expected-expense-form-dialog.component.css']
})
export class ExpectedExpenseFormDialogComponent implements OnInit {

  form: FormGroup;

  categories;
  types;

  constructor(
    private dialogRef: MatDialogRef<ExpectedExpenseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private service: ExpectedExpenseService,
    private snackBar: MatSnackBar,
    private categoryService: ExpenseCategoryService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: null,
      category: null,
      type: null,
      totalValue: ''
    });

    this.types = Object.keys(ExpectedExpenseType).filter(k => typeof ExpectedExpenseType[k] === "number");

    this.categoryService.findAll().subscribe(
      result => {
        this.categories = result;
      },
      err => {
        this.snackBar.open('Erro ao buscar categorias', 'x', { duration: 2000 });
      }
    );

    if(this.data && this.data.id) {
      this.service.findById(this.data.id).subscribe(
        result => {
          this.form = this.formBuilder.group({
            id: result.id,
            category: result.category?.id,
            type: result.type,
            totalValue: result.totalValue
          });
        },
        err => {
          this.snackBar.open(err.error, 'x', { duration: 2000 });
          this.cancel();
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.getRawValue());
  }

}
