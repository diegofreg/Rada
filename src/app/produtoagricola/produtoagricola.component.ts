import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import {map, startWith} from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { ProdutoAgricola } from 'src/models/produtoagricola';
import { ThemeService } from '../core/services/theme.service';
import {FormsService} from '../forms.service';
import {ConsultaPessoaService} from '../Services/consulta-pessoa';
import {lacreInvalido, lacreValido} from '../store/finalizar-action';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-produtoagricola',
  templateUrl: './produtoagricola.component.html',
  styleUrls: ['./produtoagricola.component.css']
})


export class ProdutoagricolaComponent implements OnInit {

  isDarkTheme!: Observable<boolean>;
	lacreStatus:Observable<boolean>

  private _appForm!: FormGroup;
  appService: any;
  erro: boolean = false;
  public get appForm(): FormGroup {
    return this._appForm;
  }
  public set appForm(v: FormGroup) {
    this._appForm = v;
  }
 
  options :any= [];
  idCultura = null
  idVariedade = null
  variedades:any = [];
  filteredOptions: any; 
  isClickedYes = "none";
  lacreList = 
	[
		{
			nrLacre:new FormControl('',Validators.required),
			termoColetaProdutoAgricola:{
				id: 4
			}
		},
	];

	lacres:any = []
	agrotoxicos:any = []

	lacresVerificados = ['01','02','03']
	agroList = [
		{
			descricao:new FormControl('',Validators.required),
			dataAplicacao:new FormControl(new Date(),Validators.required),
			localAquisicao:new FormControl('',Validators.required),
			nomeIndicacao:new FormControl('',Validators.required),
			termoColetaProdutoAgricola:{
				id: 4
			}
		}
	]

  ultimoIndex = 0
	ultimoIndexAgro = 0

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
		this.formService.setData(this.appForm)

		this.consultaPessoa.getCultura().subscribe((data:any)=>{
			this.options = data
		})

    this.filteredOptions = this.appForm.get('cultura')?.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value)),
		);

		this.appForm.get('option')?.valueChanges.subscribe(value => {
			this.isClickedYes = value
/* if(value == 'show'){ */
/* this.appForm.controls['qual'].setErrors({'required': true}); */
/* }else{ */
/* this.appForm.controls['qual'].setErrors(null); */
/* } */
		})
  }

	
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    		return this.options.filter((option:any) => option.nomeCultura.toLowerCase().includes(filterValue));

	}
  
	buscandoVariedade (culturaId:any){
		this.idCultura = culturaId
		this.appForm.controls['cultura'].disable();
		this.consultaPessoa.getVariedadePelaCultura(culturaId).subscribe((data:any) => {
			this.variedades = data
			const tipoVariedade = this.variedades[0]
			this.idVariedade = tipoVariedade.idVariedade
			this.appForm.get('variedade')?.patchValue(tipoVariedade.nomeVariedade);
		})
	}

	habilitandoInput (){
		this.appForm.controls['cultura'].enable();
	}


  novoAgro () {

		const  agroAdicionado = 
		{
			descricao:new FormControl('',Validators.required),
			dataAplicacao:new FormControl('',Validators.required),
			localAquisicao:new FormControl('',Validators.required),
			nomeIndicacao:new FormControl('',Validators.required),
			termoColetaProdutoAgricola:{
				id: 4
			}
		}

		const index = this.agroList.push(agroAdicionado)
		this.appForm.controls['agro'].setValue(this.agroList)
		this.ultimoIndexAgro = index - 1
  }

apagarAgro(agroClicado:any) {
		const indexClicado = this.agroList.indexOf(agroClicado)
		this.ultimoIndexAgro = indexClicado - 1
		this.agroList = this.agroList.filter((item,index) =>  index != this.ultimoIndexAgro)
		this.appForm.controls['agro'].setValue(this.agroList)
	}
  novoLacre () {


		const  lacreAdicionado = {
			nrLacre:new FormControl('', Validators.required),
			termoColetaProdutoAgricola:{
				id: 4
			}
		}

		const index = this.lacreList.push(lacreAdicionado)
		this.appForm.controls['nrLacre'].setValue(this.lacreList)
		this.ultimoIndex = index - 1
  }

	apagarLacre(lacreClicado:any) {
		const indexClicado = this.lacreList.indexOf(lacreClicado)
		this.ultimoIndex = indexClicado - 1
		this.lacreList = this.lacreList.filter((item,index) =>  index != this.ultimoIndex)
		this.appForm.controls['nrLacre'].setValue(this.lacreList)
	}

	verificandoLacre (indexAtual:any) {
		const lacres = this.appForm.get('nrLacre')?.value
		const lacreAtual = lacres[indexAtual]
		const Verificado = this.lacresVerificados.includes(lacreAtual.nrLacre.value)

		if(!Verificado){
			this.store.dispatch(lacreValido());
		}else{
			this.store.dispatch(lacreInvalido());
			this._snackBar.open('O Lacre digitado ja foi Utilizado, por favor digite outro', 'ok')
		}

	}


  foods: Food[] = [
    {value: 'Cultura', viewValue: 'Acefato'},
    {value: 'Cultura1', viewValue: 'Aldicarbe'},
    {value: 'Cultura2', viewValue: 'Aldni'},
    {value: 'Cultura 3', viewValue: 'Aletrina'},
    
  ];

  constructor(
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
	private http: HttpClient,
		private formService: FormsService,
		private consultaPessoa : ConsultaPessoaService,
		private store: Store<{ lacreStatus: any}>,
		private _snackBar: MatSnackBar
  ) {

		this.lacreStatus = store.select('lacreStatus')

    this.appForm = this.formBuilder.group({
      cultura: ['', Validators.required],
      nrLacre: [this.lacreList],
	  variedade:[''],
      agro: [this.agroList],
	  option:['none'],
	  obs:[''],
	  gramas:[0],
	  unidade:[0],
	  tabAtual:['Descrição do Produto Agrícola'],
    });

   }

	 validar(field:any){
		 return this.appForm.get(field)?.hasError('required')
	 }

	 storeData(){
		
		this.refatorandoValoresDoArray(this.appForm.get('nrLacre')?.value, 'lacres')
		this.refatorandoValoresDoArray(this.appForm.get('agro')?.value , 'agros')

		const produtoAgricola = new ProdutoAgricola()

		produtoAgricola.idCultura = this.idCultura
		produtoAgricola.idVariedade = this.idVariedade
		produtoAgricola.lacres = this.lacres
		produtoAgricola.observacao = this.appForm.get('obs')?.value 
		produtoAgricola.produtoAgricolaAgrotoxico = this.agrotoxicos 
		produtoAgricola.valorEnviadoGramas = this.appForm.get('gramas')?.value 
		produtoAgricola.valorEnviadoUnidade = this.appForm.get('unidade')?.value 
		produtoAgricola.termoColeta = {
			id : this.formService.getNumeroTermo()
		}

		console.log(produtoAgricola)
		this.http.post('http://localhost:8081/rada-laboratorios/termo-coleta-produtos-agricolas/salvar',produtoAgricola)
		//this.http.post(`${environment.Api}/rada-laboratorios/termo-coleta-produtos-agricolas/salvar`,produtoAgricola)
		.subscribe(
			resultado => {
				this._snackBar.open('Salvo com sucesso!', 'ok')
			},
			erro => {
				this.erro = true
				//this.refatorandoValoresDoArray(this.appForm.get('nrLacre')?.value, 'lacres')
				//this.refatorandoValoresDoArray(this.appForm.get('agro')?.value , 'agros')
				this._snackBar.open('erro ao salvar!', 'ok')
			}
		);
		}

		variedadeSelecionada(variedade:any){
			this.idVariedade = variedade
		}

		refatorandoValoresDoArray(value:any, field:String){
			if(field == "lacres"){
				value.forEach((item:any, index:any) => {
					const lacreObject = value[index]
					let lacre:any = {
						nrLacre:Number(lacreObject.nrLacre.value),
						termoColetaProdutoAgricola:{
							id: 4
						}
					}

						this.lacres.push(lacre)
					 
				})
				console.log(this.lacres)
			}else {
				value.forEach((item:any, index:any) => {
					const agro = value[index]
					let agrotoxicos:any = {
						descricao:agro.descricao.value,
						dataAplicacao:agro.dataAplicacao.value,
						localAquisicao:agro.localAquisicao.value,
						nomeIndicacao:agro.nomeIndicacao.value,
						termoColetaProdutoAgricola:{
							id: 4
						}
					}
						this.agrotoxicos.push(agrotoxicos)
				})
			}
		}

 }
