import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { TermoColeta } from 'src/models/termoColetaAcao';
import {FormsService} from '../forms.service';
import { HttpService } from '../Services/http.service';

interface Outros {
  id:number
  nome: string
  
}


interface Local {
  value: string;
  viewValue: string;
  
}



@Component({
  selector: 'app-descricaodaacao',
  templateUrl: './descricaodaacao.component.html',
  styleUrls: ['./descricaodaacao.component.scss']
})
export class DescricaodaacaoComponent implements OnInit {


  localselecionado = "";


  isOpenoutros:boolean=false;


  private _appForm!: FormGroup;
  
  public get appForm(): FormGroup {
    return this._appForm;
  }
  public set appForm(v: FormGroup) {
    this._appForm = v;
  }

  local1: Local[] = [
    {value: '10', viewValue: 'Cantinho dos Bebuns.'},
    {value: '10', viewValue: 'Quintal da Boa Ventura '},
    {value: '10', viewValue: 'Flor-de-lis'},
    {value: 'Outros', viewValue: 'Outros'},
  ];
	

	descricaodaacao = this.formBuilder.group({
		data: ['', Validators.required],
		horas: ['', Validators.required],
		acao: ['', Validators.required],
		localOutros: [''],
		local: ['', Validators.required],
		tabAtual:['Descrição da ação'],
	});   

	get local() {
		return this.descricaodaacao.get('local')
	}

	get horas() {
		return this.descricaodaacao.get('horas')
	}
	get acao() {
		return this.descricaodaacao.get('acao')
	}
	get localOutros() {
		return this.descricaodaacao.get('localOutros')
	}
	get numerodeamostras() {
		return this.descricaodaacao.get('numerodeamostras')
	}

	get data() {
		return this.descricaodaacao.get('data')
	}

  local2: Outros[] =[
    {
      id: 1,
      nome: "",
      
    },
  ]

  constructor(private formBuilder: FormBuilder, private formService:FormsService, private http: HttpService,private _snackBar: MatSnackBar) {}

  openoutros1(){
  
    this.localselecionado=this.appForm.value.localselecionado
    console.log(this.appForm)

}

  public onSubmit(): void {
    console.warn("Your order has been submitted", this.appForm.value);
    this.appForm.reset();
  }

  storeClient() {
    
    if (!this.descricaodaacao.valid) {

			Object.keys(this.descricaodaacao.controls).forEach(field => { 
			  const control = this.descricaodaacao.get(field);            
			  control?.markAsTouched({ onlySelf: true });      
			});

			if(this.acao?.hasError('required')){
          this._snackBar.open('Necessario preencher o campo ação', 'ok')
			}

    }else{
    
      const acaoSalvar:any = new TermoColeta()
      acaoSalvar.nomeLocal=  "teste" ;
      acaoSalvar.acaoTermo =  "F" ;
      acaoSalvar.data = this.dataAtualFormatada(this.descricaodaacao.get('data')?.value) + this.descricaodaacao.get('horas')?.value;
      acaoSalvar.idLocalSidagro =  "10" ;
      acaoSalvar.quantidadeAmostras =  "1"
      acaoSalvar.tipoLocal = "1";
      acaoSalvar.termoColeta = {
        id: this.formService.getNumeroTermo()
      }
      this.http.post('http://localhost:8081/rada-laboratorios/termoColetaAcao/gravar',acaoSalvar)
      this.http.post(`${environment.Api}/rada-laboratorios/termoColetaAcao/gravar`,acaoSalvar)
      .subscribe(
        resultado => {
          this._snackBar.open('Salvo com sucesso!', 'ok')
        },
        erro => {
          this._snackBar.open('Erro ao Salvar!', 'ok')
        }
      );
    }
}

  ngOnInit(): void {
		this.descricaodaacao.get('local')?.valueChanges.subscribe(value => {
			this.localselecionado = value
			if(value == 'Outros'){
				this.descricaodaacao.controls['localOutros'].setErrors({'required': true});
				this.descricaodaacao.controls['local'].setErrors(null);
			}else{
				this.descricaodaacao.controls['localOutros'].setErrors(null);
				this.descricaodaacao.controls['local'].setErrors(null);
			}
		})

		this.formService.setData(this.descricaodaacao)
  }

 dataAtualFormatada(data:any){
        let dia  = data.getDate().toString()
        const diaF = (dia.length == 1) ? '0'+dia : dia
        const mes  = (data.getMonth()+1).toString()
        const mesF = (mes.length == 1) ? '0'+mes : mes
        const anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

}
