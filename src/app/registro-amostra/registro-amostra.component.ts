import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Registro } from 'src/models/registro';
import { ReturnCodeDialogComponent } from '../return-code-dialog/return-code-dialog.component';
import { ConsultaPessoaService } from '../Services/consulta-pessoa';

@Component({
  selector: 'app-registro-amostra',
  templateUrl: './registro-amostra.component.html',
  styleUrls: ['./registro-amostra.component.css']
})
export class RegistroAmostraComponent implements OnInit {
	clickedButton = "Não Conforme"
  tipoPesquisa = "Não Conforme"
  data = ""
  hora = ""
  numero = ""
  dados:any = []
  lacres:any = []
  cultura:any = []
	finalizado = false
	codigoRetornado:any = 0

  model = {
    nomeAnalista:"",
    dsObservacao:""
  }

  dadosEntrada = {
    dataEntrada:"",
    horaEntrada:""
  }

	analiseGrupo:FormGroup

  constructor(
		public dialog:MatDialog,
    private http: HttpClient,
    private formService: ConsultaPessoaService,
		private formBuilder: FormBuilder
	) { 

		this.analiseGrupo = formBuilder.group({
			inseticidasPiretroides: false,
			inseticidasOrganoclorados: false,
			inseticidasOrganofosforados: false,
			fungicidasDitiocarbamatos: false,
			fungicidasTriazóis: false,
			fungicidasDicarboximida: false,
			Outros: false,
		});

		}

  ngOnInit(): void {
    this.formService.getCultura().subscribe((data:any)=>{
			this.cultura = data
		})
  }

	finalize(){

		if(this.finalizado){

			this.analiseGrupo.reset()
			this.dadosEntrada.horaEntrada = ""
			this.dadosEntrada.dataEntrada = ""
			this.model.dsObservacao = ""
			this.model.nomeAnalista = ""
			this.numero = ""
      this.data = ""
      this.hora = ""
			this.finalizado = false
      this.dados =[]
		}else{

			const produto:any = this.dados[0]
			const registro = new Registro()

			if(produto){
				registro.idCultura = 1
				registro.idVariedade = 1
				registro.vlEnviadoGramas = produto.valorEnviadoGramas
				registro.vlEnviadoUnidade = produto.valorEnviadoUnidade
				registro.dsObservacao = this.model.dsObservacao
				registro.nomeAnalista = this.model.nomeAnalista

				this.http.post(`http://localhost:8081/rada-laboratorios/RegistroDeAmostra/finalizar`, registro)
					.subscribe(
						(resultado:any) => {
							this.dialog.open(ReturnCodeDialogComponent,{
								width:'auto',
								data: {codigo:this.ramdomCode(resultado.id)}
							})
							this.finalizado = true
						},
						erro => {
							console.log(erro);
						}
				);
			}	
		}

	}

  pesquisar () {
    if(this.tipoPesquisa == "Não Conforme"){
      this.http.get(`http://localhost:8081/rada-laboratorios/termo-coleta-produtos-agricolas/buscarpelonumerodotermo/${this.numero}`)
      .subscribe(
        (resultado:any) => {
          if(resultado.length > 0 ){
            const lacreList = resultado.map((item:any,index:any)=> {
              if(index != resultado.length - 1){
                return item.nrLacre + ','
              }
              return item.nrLacre
            })
            this.lacres = lacreList
            
  
            resultado.forEach((item:any)=> {
  
              const cultura = this.cultura.filter((item2:any) => item2.idCultura == item.idCultura )
              const culturaObj  = cultura[0]
  
              if(culturaObj){
                this.formService.getVariedadePelaCultura(item.idCultura).subscribe(response => {
                   const variedade = response.filter((item2:any)=> item2.idVariedade == item.idVariedade)
                   item.idVariedade = variedade[0].nomeVariedade
                })
                item.idCultura = culturaObj.nomeCultura
              }
             
            })
            this.dados = resultado
            const retorno = resultado[0]
            this.data =  this.dataAtualFormatada(retorno.data)
            this.hora = this.horaFormatada(retorno.data)
          }else{
            this.dialog.open(ReturnCodeDialogComponent,{
              width:'auto',
              data: {erro:true}
            })
          }

        },
        erro => {
          this.dialog.open(ReturnCodeDialogComponent,{
            width:'auto',
            data: {erro:true}
          })
        }
      );
    }else {
      this.http.get(`http://localhost:8081/rada-laboratorios/termo-coleta-produtos-agricolas/buscarpelonumerodolacre/${Number(this.numero)}`)
      .subscribe(
        (resultado:any)=> { 
          if(resultado.length > 0){
            const lacreList = resultado.map((item:any,index:any)=> {
              if(index != resultado.length - 1){
                return item.nrLacre + ','
              }
              return item.nrLacre
            })
            this.lacres = lacreList
            resultado.forEach((item:any)=> {
  
              const cultura = this.cultura.filter((item2:any) => item2.idCultura == item.idCultura )
              const culturaObj  = cultura[0]
  
              if(culturaObj){
                this.formService.getVariedadePelaCultura(item.idCultura).subscribe(response => {
                   const variedade = response.filter((item2:any)=> item2.idVariedade == item.idVariedade)
                   item.idVariedade = variedade[0].nomeVariedade
                })
                item.idCultura = culturaObj.nomeCultura
              }
             
            })
            this.dados = resultado
            console.log(resultado)
            const retorno = resultado[0]
            this.data =  this.dataAtualFormatada(retorno.data)
            this.hora = this.horaFormatada(retorno.data)
          }else {
            this.dialog.open(ReturnCodeDialogComponent,{
              width:'auto',
              data: {erro:true}
            })
          }
        },
        erro => {
          this.dialog.open(ReturnCodeDialogComponent,{
            width:'auto',
            data: {erro:true}
          })
        }
      );
    }
  }

  dataAtualFormatada(milisegundos:any){
    let data = new Date(milisegundos)
    let dia  = data.getDate().toString()
    const diaF = (dia.length == 1) ? '0'+dia : dia
    const mes  = (data.getMonth()+1).toString()
    const mesF = (mes.length == 1) ? '0'+mes : mes
    const anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }

  horaFormatada(milisegundos:any){
    let data = new Date(milisegundos)
    data.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const minuto  = data.getMinutes().toString()
    const minutoF =(minuto.length == 1) ? '0'+minuto : minuto 
    return data.getHours() + ':' + minutoF;
  }

  setGramas(event:any){
   const produto =  this.dados[0]
   produto.valorEnviadoGramas = Number(event.target.value) 
  } 

  setUnidade(event:any){
    const produto =  this.dados[0]
    produto.valorEnviadoUnidade = Number(event.target.value)
  }


  ramdomCode (id:number) {
    const registroid = id.toString()
    if(this.clickedButton == "Não Conforme"){
			const codigo = 'NC' +'0' + registroid + "/2022"
			this.codigoRetornado = codigo
      return codigo

    }else{
			const codigo = '0' + registroid + "/2022"
			this.codigoRetornado = codigo
      return codigo
    }
  }

  dataFormatada(){
    let data = new Date()
    const mes  = (data.getMonth()+1).toString()
    const mesF = (mes.length == 1) ? '0'+mes : mes
    const anoF = data.getFullYear();
    if(this.clickedButton == "Não Conforme"){
      return "NC"+mesF+"/"+anoF;
    }else{
      return mesF+"/"+anoF;
    }
    
  }
}
