import { Component, Input, OnInit } from '@angular/core';
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

  cadastrar = false

  form: FormGroup;

  situacao: string = "";
  nome: string = "";
  descricao = "";

  @Input() valor: any;
  visualizar: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private formService:FormsService, 
              private http: HttpService, 
              private service: ConsultaPessoaService, 
              private _snackBar: MatSnackBar 
              ) { 

    this.form = this.formBuilder.group({
      
      descricao:['',Validators.required],
      situacao:['true',Validators.required],
      nome:['',Validators.required]


    });
  }

  validar(field:any){
    return this.form.get(field)?.hasError('required')
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
   this.formService.fixed$
    .subscribe(fixed => {
      if(fixed.editar || fixed.visualizar){
        this.form.setValue({descricao:fixed.descricao,nome:fixed.nomeMetodoReferencia,situacao:fixed.situacao})
        if(fixed.visualizar){
          this.visualizar = true
        }
      }else {
        this.form.reset()
        this.visualizar = false
      }
      
    })
  }

  storeData(){
	
    if(this.form.valid){
      
      const metodoReferencia = new MetodoReferencia();
		
      metodoReferencia.descricao = this.form.get('descricao')?.value;
      metodoReferencia.situacao = this.form.get('situacao')?.value;
      metodoReferencia.nomeMetodoReferencia = this.form.get('nome')?.value;
      
      console.log(metodoReferencia)
      this.http.post('http://localhost:8081/rada-laboratorios/metodo-referencia',metodoReferencia)
       
      .subscribe(
        resultado => {
  
          console.log('TESTE DE ERRO')
  
          this._snackBar.open('Salvo com sucesso!', 'ok')
  
          this.cadastrar = true
        },
        erro => { 
          
         
            
            this.erro = true
        
            this._snackBar.open('erro ao salvar!', 'ok')
          }
        
      );
  
      this.cadastrar = false
      this.form.reset();
    
    }else {
      Object.keys(this.form.controls).forEach(field => { 
			  const control = this.form.get(field);            
			  control?.markAsTouched({ onlySelf: true });      
			});
    }
  }

}

