import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-form-dialog',
  templateUrl: './expense-form-dialog.component.html',
  styleUrls: ['./expense-form-dialog.component.css']
})
export class ExpenseFormDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ExpenseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.data?.id);
    this.form = this.formBuilder.group({
      name: '',
      value: ''
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.getRawValue());
  }

}
