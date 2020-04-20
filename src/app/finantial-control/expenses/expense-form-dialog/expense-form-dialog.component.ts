import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpensesService } from '../expenses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseCategoryService } from '../../expenses-categories/expense-category.service';

@Component({
  selector: 'app-expense-form-dialog',
  templateUrl: './expense-form-dialog.component.html',
  styleUrls: ['./expense-form-dialog.component.css']
})
export class ExpenseFormDialogComponent implements OnInit {

  form: FormGroup;
  categories;

  constructor(
    private dialogRef: MatDialogRef<ExpenseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private service: ExpensesService,
    private snackBar: MatSnackBar,
    private categoryService: ExpenseCategoryService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: null,
      name: '',
      amount: '',
      expenseDate: '',
      category: null
    });

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
            name: result.name,
            amount: result.amount,
            expenseDate: this._convertToDate(result.expenseDate),
            category: result.category?.id
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

  private _convertToDate(dateAsString) {
    const splittedDate = dateAsString.split('/');
    return new Date(splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0] + 't00:00');
  }

}
