import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpectedExpenseService } from '../expected-expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpectedExpenseType } from '../expected-expense-type';
import { ExpenseCategoryService } from '../../expenses-categories/expense-category.service';
import { ExpectedExpenseFormula } from '../expected-expense-formula';
import { group } from '@angular/animations';
import { ExpectedExpenseFormulaElement } from '../expected-expense-formula-element';
import { ExpectedExpenseFormulaElementType } from '../expected-expense-formula-element-type';

@Component({
  selector: 'app-expected-expense-form-dialog',
  templateUrl: './expected-expense-form-dialog.component.html',
  styleUrls: ['./expected-expense-form-dialog.component.css']
})
export class ExpectedExpenseFormDialogComponent implements OnInit {

  form: FormGroup;
  formulas: FormArray;

  categories;
  types;
  elementTypes;

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
      totalValue: '',
      formulas: this.formBuilder.array([this.createFormulasFormGroup()])
    });

    this.types = Object.keys(ExpectedExpenseType).filter(k => typeof ExpectedExpenseType[k] === "number");
    this.elementTypes = Object.keys(ExpectedExpenseFormulaElementType).filter(k => typeof ExpectedExpenseFormulaElementType[k] === "number");

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
          console.log(result);
          this.form = this.formBuilder.group({
            id: result.id,
            category: result.category?.id,
            type: result.type,
            totalValue: result.totalValue,
            formulas: this.formBuilder.array([])
          });

          result.formulas.forEach(formula => {
              this.formulas = this.form.get('formulas') as FormArray;
              
              this.formulas.push(this.createFormulasFormGroup(formula));
            }
          );

          console.log(this.form);
        },
        err => {
          this.snackBar.open(err.error, 'x', { duration: 2000 });
          this.cancel();
        }
      );
    }
  }

  createFormulasFormGroup(formula: ExpectedExpenseFormula = null): FormGroup {
    let group = this.formBuilder.group({
      id: formula?.id,
      operation: formula?.operation,
      elements: this.formBuilder.array([])
    });

    if(formula && formula.elements) {
      formula.elements.forEach(element => {
        let elements = group.get('elements') as FormArray;

        elements.push(this.createFormulaElementsFormGroup(element));
      });
    }

    return group;
  }

  createFormulaElementsFormGroup(element: ExpectedExpenseFormulaElement = null): FormGroup {
    return this.formBuilder.group({
      id: element?.id,
      operation: element?.operation,
      type: element?.type,
      totalValue: element?.totalValue,
      parameter: element?.parameter?.name
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.form.getRawValue());
    this.dialogRef.close(this.form.getRawValue());
  }



  get formFormulas() {
    return <FormArray>this.form.get("formulas");
  }

  getElement(formula: FormGroup) {
    return <FormArray>formula.get('elements');
  }

}
