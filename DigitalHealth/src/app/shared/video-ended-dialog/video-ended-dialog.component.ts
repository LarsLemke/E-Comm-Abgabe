import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-ended-dialog',
  templateUrl: './video-ended-dialog.component.html',
  styleUrls: ['./video-ended-dialog.component.css'],
})
export class VideoEndedDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<VideoEndedDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      s1: '',
      s2: '',
    });
  }
  checkoutForm;
  onConfirmClick(): void {
    this.dialogRef.close({ data: true });
  }
  onSave() {
    this.dialogRef.close();
  }
  onClose() {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
