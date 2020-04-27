import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinantialParametersService } from '../finantial-parameters.service';

@Component({
  selector: 'app-finantial-parameter-form-dialog',
  templateUrl: './finantial-parameter-form-dialog.component.html',
  styleUrls: ['./finantial-parameter-form-dialog.component.css']
})
export class FinantialParameterFormDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FinantialParameterFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private service: FinantialParametersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: null,
      name: '',
      value: ''
    });

    if(this.data && this.data.id) {
      this.service.findById(this.data.id).subscribe(
        result => {
          this.form = this.formBuilder.group({
            id: result.id,
            name: result.name,
            value: result.value
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
