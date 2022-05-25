import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-return-code-dialog',
  templateUrl: './return-code-dialog.component.html',
  styleUrls: ['./return-code-dialog.component.css']
})
export class ReturnCodeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReturnCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    
  }

}
