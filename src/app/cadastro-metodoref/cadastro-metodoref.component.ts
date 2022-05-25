import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsService} from '../forms.service';
import { HttpService } from '../Services/http.service';
import { ThemeService } from '../core/services/theme.service';
import { MetodoReferencia } from 'src/models/metodoreferencia';
import { ConsultaPessoaService } from '../Services/consulta-pessoa';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-cadastro-metodoref',
  templateUrl: './cadastro-metodoref.component.html',
  styleUrls: ['./cadastro-metodoref.component.css']
})
export class CadastroMetodorefComponent implements OnInit {

  isDarkTheme!: Observable<boolean>;


  form: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private formService:FormsService, 
              private http: HttpService, 
              private service: ConsultaPessoaService, 
              private _snackBar: MatSnackBar 
              ) { 

    this.form = this.formBuilder.group({
      
      descricao:[''],
      situacao:[''],
      nome:[''],


    });
  }


  private _appForm!: FormGroup;
  erro: boolean = false;
  
  public get appForm(): FormGroup {
    return this._appForm;
  }
  public set appForm(v: FormGroup) {
    this._appForm = v;
  }

  ngOnInit(): void {

  }

  storeData(){
	

    const metodoReferencia = new MetodoReferencia();
		
    metodoReferencia.descricao = this.form.get('descricao')?.value;
    metodoReferencia.situacao = this.form.get('situacao')?.value;
    metodoReferencia.nomeMetodoReferencia = this.form.get('nome')?.value;
    
		this.http.post('http://localhost:8081/rada-laboratorios/metodo-referencia',metodoReferencia)
		
		.subscribe(
			resultado => {
				this._snackBar.open('Salvo com sucesso!', 'ok')
			},
			erro => {
				this.erro = true
			
				this._snackBar.open('erro ao salvar!', 'ok')
			}
		);
  
}
}