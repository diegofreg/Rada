import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-errors',
  templateUrl: './dialog-errors.component.html',
  styleUrls: ['./dialog-errors.component.css']
})
export class DialogErrorsComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
	) { }

  ngOnInit(): void {
  }

}
