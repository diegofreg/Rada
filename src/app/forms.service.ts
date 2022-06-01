import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

	forms:any = []
	numeroTermo : number = 0
	 
	
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


	private fixed = new BehaviorSubject<any>({id:0,nomeMetodoReferencia:"",descricao:"",situacao:"",editar:false,visualizar:false}); // true is your initial value
	fixed$ = this.fixed.asObservable();
  
	public  isFixed(value: any) {
	  this.fixed.next(value);
	  console.log('isFixed changed', value);
	}
  
	public  isFixedd():any {
	  return this.fixed.getValue()
	}

}
