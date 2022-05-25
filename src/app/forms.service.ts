import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

	forms:any = []
	numeroTermo : number = 0
	
  constructor() { }
	
	getData(){
		return this.forms
	}

	getNumeroTermo (){
		return this.numeroTermo
	}

	setNumeroTermo (numero:number){
		this.numeroTermo = numero
	}

	setData(form:any){
		if(this.forms.length >= 4){
			return
		}else{
			this.forms.push(form)
		}
	}

}
