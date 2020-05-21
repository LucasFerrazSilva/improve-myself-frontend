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
import { Operations } from 'src/app/util/operations';
import { FinantialParametersService } from '../../finantial-parameters/finantial-parameters.service';
import { FinantialParameter } from '../../finantial-parameters/finantial-parameter';
import { ExpectedExpensePeriod } from '../expected-expense-period';

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
  periods;
  elementTypes;
  operations;
  parameters: FinantialParameter[];

  formulaLabel = 'a';
  formulaTotalValue = 0;

  constructor(
    private dialogRef: MatDialogRef<ExpectedExpenseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private service: ExpectedExpenseService,
    private snackBar: MatSnackBar,
    private categoryService: ExpenseCategoryService,
    private parameterService: FinantialParametersService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: null,
      category: null,
      period: null,
      type: null,
      totalValue: '',
      formulas: this.formBuilder.array([this.createFormulasFormGroup()])
    });

    this.types = Object.keys(ExpectedExpenseType).filter(k => typeof ExpectedExpenseType[k] === "number");
    this.periods = Object.keys(ExpectedExpensePeriod).filter(k => typeof ExpectedExpensePeriod[k] === "number");
    this.elementTypes = Object.keys(ExpectedExpenseFormulaElementType).filter(k => typeof ExpectedExpenseFormulaElementType[k] === "number");
    this.operations = Object.keys(Operations).filter(k => typeof Operations[k] === "number");

    this.categoryService.findAll().subscribe(
      result => {
        this.categories = result;
      },
      err => {
        this.snackBar.open('Erro ao buscar categorias', 'x', { duration: 2000 });
      }
    );

    this.parameterService.findAll().subscribe(
      result => {
        this.parameters = result;
      },
      err => {
        this.snackBar.open('Erro ao buscar parâmetros', 'x', { duration: 2000 });
      }
    );

    if(this.data && this.data.id) {
      this.service.findById(this.data.id).subscribe(
        result => {
          this.form = this.formBuilder.group({
            id: result.id,
            category: result.category?.id,
            period: result.period,
            type: result.type,
            totalValue: result.totalValue,
            formulas: this.formBuilder.array([])
          });

          result.formulas.forEach(formula => {
              this.formulas = this.form.get('formulas') as FormArray;
              
              this.formulas.push(this.createFormulasFormGroup(formula));
            }
          );

          this.buildFormulaLabelAndTotalValue();
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
      operation: (formula ? formula?.operation : '+'),
      elements: this.formBuilder.array([])
    });

    let elements = group.get('elements') as FormArray;

    if(formula?.elements?.length > 0) {
      formula.elements.forEach(element => {
        elements.push(this.createFormulaElementsFormGroup(element));
      });
    } else {
      elements.push(this.createFormulaElementsFormGroup());
      elements.push(this.createFormulaElementsFormGroup());
    }

    return group;
  }

  createFormulaElementsFormGroup(element: ExpectedExpenseFormulaElement = null): FormGroup {
    return this.formBuilder.group({
      id: element?.id,
      operation: (element ? element.operation : '+'),
      type: (element ? element.type : 'VALUE'),
      totalValue: (element ? element.totalValue : 0),
      parameter: element?.parameter?.id
    });
  }

  addFormula() {
    const formulas = this.form.get('formulas') as FormArray;

    formulas.push(this.createFormulasFormGroup());
  }

  removeFormula(formulaIndex) {
    const formulas = this.form.get('formulas') as FormArray;

    formulas.removeAt(formulaIndex);
  }

  addElement(formula) {
    let elements = formula.get('elements') as FormArray;

    elements.push(this.createFormulaElementsFormGroup());
  }

  deleteElement(formula, elementIndex) {
    let elements = formula.get('elements') as FormArray;

    elements.removeAt(elementIndex);
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.getRawValue());
  }



  get formFormulas() {
    return <FormArray>this.form.get("formulas");
  }

  getElement(formula: FormGroup) {
    const elements = <FormArray>formula.get('elements');

    return elements;
  }

  buildFormulaLabelAndTotalValue() {
    this.formulaLabel = '';

    for(let i = 0; i < 10000 && !this.parameters; i++);

    if(this.form && this.form.get('formulas')) {
      const formulas = this.form.get('formulas') as FormArray;

      let formulaIndex = 0;
      this.formulaTotalValue = 0;

      formulas.value.forEach(formula => {
        if(formulaIndex > 0)
          this.formulaLabel += formula.operation + ' ';
          
        this.formulaLabel += '(';

        let elementIndex = 0;

        let elementsTotalValue = 0;

        formula.elements.forEach(element => {
          let elementOperation = '+';

          if(elementIndex > 0) {
            this.formulaLabel += ' ' + element.operation + ' ';
            elementOperation = element.operation;
          }

          const elementValue = (element.type == 'VALUE' ? element.totalValue : this.parameters.find(p => p.id == element.parameter).value);

          this.formulaLabel += elementValue;

          switch(elementOperation) {
            case '+': elementsTotalValue += parseFloat(elementValue); break;
            case '-': elementsTotalValue -= elementValue; break;
            case '/': elementsTotalValue /= elementValue; break;
            case '*': elementsTotalValue *= elementValue; break;
          }

          elementIndex++;
        });

        this.formulaLabel += ') ';

        let operation = '+';

        if(formulaIndex > 0)
          operation = formula.operation;

        switch(operation) {
          case '+': this.formulaTotalValue = this.formulaTotalValue + elementsTotalValue; break;
          case '-': this.formulaTotalValue -= elementsTotalValue; break;
          case '/': this.formulaTotalValue /= elementsTotalValue; break;
          case '*': this.formulaTotalValue *= elementsTotalValue; break;
        }

        this.formulaTotalValue = Number.parseFloat(this.formulaTotalValue.toFixed(2));

        formulaIndex++;
      });
    }
  }

}
