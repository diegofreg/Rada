import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaPessoaService } from '../Services/consulta-pessoa';
import { TermoColeta } from 'src/models/termoColetaEnvolvidos';
import { HttpClient } from '@angular/common/http';
import {FormsService} from '../forms.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorsComponent} from '../modal/dialog-errors/dialog-errors.component';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

export interface TestemunhaProps {
  id: number,
  nome: string
  identidade: string

}

let formData = {
  nome: '',
  cargo: '',
  masp: null,
}

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-envolvidos',
  templateUrl: './envolvidos.component.html',
  styleUrls: ['./envolvidos.component.css']
})
export class EnvolvidosComponent implements OnInit {
  
  isChecked = false
	alreadyOpen = false
	errorsList:any = []
	errosCamposEnvolvidos:any = []
	errosCamposFiscalizados:any = []
	errosCamposProdAgri:any = []
	errosCamposAct:any = []
	errosFiscalizado:any = []
  numeroDeTestemunhas = [
	{
    nome:new FormControl('',Validators.required),
    identidade:new FormControl('', Validators.required)
	},
	]
  ultimoIndex = 0

  
  foods: Food[] = [
    {value: 'DF', viewValue: 'Fiscal Assistente Agropecuário '},
    {value: 'MG', viewValue: 'Fiscal Agropecuário'},
    
  ];

  isOpentestemunha:boolean=false;
	lacreEstaValidado: Observable<boolean>

  
  private _appForm!: FormGroup;
  appService: any;
  public get appForm(): FormGroup {
    return this._appForm;
  }
  public set appForm(v: FormGroup) {
    this._appForm = v;
    this._appForm.get("nome")!.disable();
  }


  
  testemunhas: TestemunhaProps[] =[
    {
      id: 1,
      nome: "",
      identidade: ""
    },
    {
      id: 2,
      nome: "",
      identidade: ""
    },
    {
      id: 3,
      nome: "",
      identidade: ""
    },
  ]

  dd = [
    {
      nome: "",
      identidade: ""
    },
  ]

  constructor(

    private Masp1: ConsultaPessoaService,   
    private formBuilder: FormBuilder,
    private http: HttpClient,
		private formService: FormsService,
		public dialog:MatDialog,
		private store: Store<{ lacreStatus: any}>,
		private pessoaService : ConsultaPessoaService,
		private _snackBar: MatSnackBar
  ) {

		this.lacreEstaValidado = store.select('lacreStatus')

    this.appForm = this.formBuilder.group({
      numeromasp: ['', Validators.required],
      nome: ['', Validators.required],
      cargo: ['', Validators.required],
      responsavel: ['', Validators.required],
      identidade: ['', Validators.required],
	  tabAtual:['identificação dos envolvidos'],
	  assinado:[false],
	  adicionados:[this.numeroDeTestemunhas]
    });   
  }

	get numeromasp(){
		return this.appForm.get('numeromasp')
	}

	get nome(){
		return this.appForm.get('nome')
	}
	get cargo(){
		return this.appForm.get('cargo')
	}
	get responsavel(){
		return this.appForm.get('responsavel')
	}

	get identidade(){
		return this.appForm.get('numeromasp')
	}

	openModal (){
		this.dialog.open(DialogErrorsComponent,{width:'auto' , data: this.errorsList})
		this.alreadyOpen = true
	}

  ngOnInit(): void {
		this.formService.setData(this.appForm)
		this.appForm.get('assinado')?.valueChanges.subscribe(value => {
			this.isChecked = value
		})
	}

  opentestemunha(){
  
      this.testemunhas = [
        {
          id: 1,
          nome: "",
          identidade: ""
        },
        {
          id: 2,
          nome: "",
          identidade: ""
        },
        {
          id: 3,
          nome: "",
          identidade: ""
        },
      ]

    this.isOpentestemunha = !this.isOpentestemunha


  }

public onBlur3(): void {
  const numeromasp = this.appForm.get("numeromasp")?.value;

  console.log("BLUR3", numeromasp);

  this.Masp1.getPessoamasp(numeromasp,).subscribe(
    (data) => { //Alterei aqui

const{}=this.Masp1
const{idPessoa,nunMaspOuRegInstituicaoConveniada,}=numeromasp

console.log({ data })
const { nomePessoa, usuario } = data
const { usuarioLocalizacaoList } = usuario
const { papel } = usuarioLocalizacaoList[1]
const { nome: nomeCargo } = papel

    formData.nome = nomePessoa
    formData.cargo = nomeCargo
    formData.masp = numeromasp
      

      this.appForm.get("nome")?.patchValue(nomePessoa);
      this.appForm.get("cargo")?.patchValue(nomeCargo);      
      this.appForm.get("Condigo")?.patchValue(nunMaspOuRegInstituicaoConveniada);
      
    });

}


public verifyData(): boolean {
  const envolvidos = localStorage.getItem('envolvidos')
  const slaoq = localStorage.getItem('slaoq')
  const slaoqmais = localStorage.getItem('slaoqmais')

  if (
    !envolvidos ||
    !slaoq ||
    !slaoqmais
  ) throw new Error('Some data is missing')

  const { nome, cargo, masp } = JSON.parse(envolvidos)
  const { data, data1, data2 } = JSON.parse(slaoq)

  if (
    !nome || !cargo || !masp ||
    !data || !data1 || !data2
  ) return false

  return true
}

clear () {
	this.errorsList =[]
	this.errosFiscalizado = []
	this.errosCamposEnvolvidos =[]
	this.errosCamposProdAgri = []
	this.errosCamposAct = []
}
updateErrorList(){

	this.clear()

	this.formService.getData().forEach((item:any) :void => {

		if(!item.valid || this.isChecked){
			switch (item.value.tabAtual){
				case "identificação dos envolvidos":
					const  novaTestemunha = item.value.adicionados.filter((item:any) => item.nome.hasError('required') || item.identidade.hasError('required'))

					for(let obj in item.value){
					item.get(obj)?.valid ? true : this.errosCamposEnvolvidos.push(obj)
				}
				console.log(novaTestemunha)
				if(this.isChecked){

					novaTestemunha.length <= 0 ? true : this.errosCamposEnvolvidos.push('testemunha')

				}
				if(this.errosCamposEnvolvidos <= 0){
					return
				}else{
					this.errorsList.push({aba:'Envolvidos', campos:this.errosCamposEnvolvidos})
				}

				break
				case "Descrição do Produto Agrícola":

				const lacreInputs = item.value.nrLacre
				const lacre = lacreInputs.filter((item:any) => item.nrLacre.hasError('required'))
					for(let obj in item.value){
						item.get(obj)?.valid ? true : this.errosCamposProdAgri.push(obj)
					}


				this.lacreEstaValidado.subscribe((data:any)=>{
					lacre.length <= 0 && data ? true : this.errosCamposProdAgri.push('numerodolacre')
				})

					this.errorsList.push({aba:'Descrição do Produto Agrícola', campos:this.errosCamposProdAgri})
				break
				case "Descrição da ação":
					for(let obj in item.value){
					item.get(obj)?.valid  && this.lacreEstaValidado ? true : this.errosCamposAct.push(obj)
				}

				this.errorsList.push({aba:'Descrição da ação', campos:this.errosCamposAct})
				break

				case "Identificação do fiscalizado":

				for(let obj in item.value){
					item.get(obj)?.valid ? true : this.errosFiscalizado.push(obj)
				}

				this.errorsList.push({aba:'Identificação do fiscalizado', campos:this.errosFiscalizado})
				break
			}
		}
	})
}


public storeData() {
	const naoPreenchido = this.formService.getData().filter((item:any) => !item.valid)
	if(naoPreenchido.length <= 0){
		//fazer chamada da api aqui , para receber o getData()
	}else{
		console.log(naoPreenchido)
		this.updateErrorList()
		this.openModal()
	}

}

storeClient() {
	if(!this.appForm.valid){
		Object.keys(this.appForm.controls).forEach(field => { 
			const control = this.appForm.get(field);            
			control?.markAsTouched({ onlySelf: true });      
		});
	}else{

		var termoSalvar = new TermoColeta();

		termoSalvar.numeroMaspFiscal = this.appForm.get('numeromasp')?.value as number
		termoSalvar.nomeFiscal = this.appForm.get('nome')?.value as string
		termoSalvar.cargoFiscal = this.appForm.get('cargo')?.value as string
		termoSalvar.nomeResponsavel = this.appForm.get('nome1')?.value as string
		termoSalvar.idPessoaFiscalSidagro = this.appForm.get('identidade')?.value as string
		termoSalvar.termoColeta = {
			id:1
		}

	//	for (const testemunha of this.testemunhas.filter(t => t.nome !== '')) {
	//		termoSalvar.testemunhas.push(testemunha)
	//	}

	//	console.log({ dados: termoSalvar })
		// if (!termoSalvar.assinado && termoSalvar.testemunhas.length < 1) throw new Error('Nenhuma testemunha inserida')


		this.http.post(`${environment.Api}/rada-laboratorios/termoColetaEnvolvidos/gravar`,termoSalvar)
		this.http.post('http://localhost:8081/rada-laboratorios/termoColetaEnvolvidos/gravar',termoSalvar)
		.subscribe(
			resultado => {
				this._snackBar.open('Salvo com sucesso!', 'ok')
			},
			erro => {
				if(erro.status >= 400) {
					this._snackBar.open('Erro ao Salvar!', 'ok')
				}
			}
		);

		console.log("Passou salvar")
	}
}

novaTestemunha () {

  const testemunhaObjeto = {
    nome:new FormControl('', Validators.required),
    identidade:new FormControl('', Validators.required)
  }

	const index = this.numeroDeTestemunhas.push(testemunhaObjeto)  
	this.appForm.controls['adicionados'].setValue(this.numeroDeTestemunhas)
  this.ultimoIndex = index - 1
 }

 apagarTestemunha (testemunhaClicada:any) {
	const indexClicado = this.numeroDeTestemunhas.indexOf(testemunhaClicada)
	this.ultimoIndex = indexClicado - 1
	this.numeroDeTestemunhas = this.numeroDeTestemunhas.filter((item,index) =>  index != this.ultimoIndex)
	this.appForm.controls['adicionados'].setValue(this.numeroDeTestemunhas)
 }
}


