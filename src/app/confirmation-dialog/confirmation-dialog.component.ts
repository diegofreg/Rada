import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		  @Inject(MAT_DIALOG_DATA) public data:any
    ) { }

  ngOnInit(): void {
  }
	cancel(){
		this.dialogRef.close()
	}
  acao(){
    if(this.data.situacao == "true"){
      return this.data.source.map((item:any)=> {
        return item.id == this.data.id ? {...item, situacao:"false"} : item
       })
    }else{
      return this.data.source.filter((item:any)=> item.id != this.data.id)
    }
  }
}
