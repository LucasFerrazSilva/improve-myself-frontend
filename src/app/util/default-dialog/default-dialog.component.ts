import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-default-dialog',
  templateUrl: './default-dialog.component.html',
  styleUrls: ['./default-dialog.component.css']
})
export class DefaultDialogComponent implements OnInit {

  tittle;
  message;
  cancelButtonText;
  confirmButtonText;


  constructor(
    private dialogRef: MatDialogRef<DefaultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }
  

  ngOnInit(): void {
    this.tittle = this.data.tittle;
    this.message = this.data.message;
    this.cancelButtonText = this.data.cancelButtonText;
    this.confirmButtonText = this.data.confirmButtonText;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  save() {
    this.dialogRef.close(true);
  }

}
