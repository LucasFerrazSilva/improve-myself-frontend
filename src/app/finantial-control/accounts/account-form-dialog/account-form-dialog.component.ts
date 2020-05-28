import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountsService } from '../accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-form-dialog',
  templateUrl: './account-form-dialog.component.html',
  styleUrls: ['./account-form-dialog.component.css']
})
export class AccountFormDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AccountFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private service: AccountsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: null,
      name: '',
      balance: ''
    });

    if(this.data && this.data.id) {
      this.service.findById(this.data.id).subscribe(
        result => {
          this.form = this.formBuilder.group({
            id: result.id,
            name: result.name,
            balance: result.balance
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
