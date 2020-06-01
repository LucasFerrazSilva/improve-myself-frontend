import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountFormDialogComponent } from '../../accounts/account-form-dialog/account-form-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvestmentsService } from '../investments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-investment-form-dialog',
  templateUrl: './investment-form-dialog.component.html',
  styleUrls: ['./investment-form-dialog.component.css']
})
export class InvestmentFormDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AccountFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private service: InvestmentsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: null,
      name: '',
      amount: ''
    });

    if(this.data && this.data.id) {
      this.service.findById(this.data.id).subscribe(
        result => {
          this.form = this.formBuilder.group({
            id: result.id,
            name: result.name,
            amount: result.amount
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
