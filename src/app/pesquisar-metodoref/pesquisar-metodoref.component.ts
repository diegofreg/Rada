import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsService} from '../forms.service';
import { HttpService } from '../Services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Pesquisarinterface } from './pesquisar-interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';




@Component({
  selector: 'app-pesquisar-metodoref',
  templateUrl: './pesquisar-metodoref.component.html',
  styleUrls: ['./pesquisar-metodoref.component.css']
})

export class PesquisarMetodorefComponent implements OnInit {

  pesquisar: Pesquisarinterface [] = [];

  @Output() cadastroTab: EventEmitter<any> = new EventEmitter();
 


  pesquisado = false
  
  displayedColumns: string[] = ['acoes', 'nomeMetodoReferencia', 'descricao', 'situacao'];
  dataSource: any = []



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  metodoDeReferencia: any = "";
  situacao: string = "";
  valoresParaFiltro: any;


  //ngAfterViewInit(): void {
    
    //this.dataSource.paginator = this.paginator;
  //}

//  dataSource: Pesquisarinterface[] = [

//    { id: 1, descricao: 'xxx', situacao: 'Teste'}
    
//  ];

  

//  displayedColumns = ['descricao', 'situacao']

  constructor(
    private formBuilder: FormBuilder, 
    private formService:FormsService,
    private http: HttpService,
    public dialog:MatDialog,
  ) { 

    this.appForm = this.formBuilder.group({
      metodoDeReferencia:[''],
      situacao:['',Validators.required],
      tabAtual:['Descrição']
    });
  }

private _appForm!: FormGroup;

public get appForm(): FormGroup {
  return this._appForm;
}
public set appForm(v: FormGroup) {
  this._appForm = v;
}

ngOnInit(): void {
  this.http.get<Pesquisarinterface[]>('http://localhost:8081/rada-laboratorios/metodo-referencia-pesquisa/listarMetodoReferencia')
  .subscribe(
   (resultado:any)=> {
     const result = resultado.map((item:any)=>{
       item.situacao = item.situacao.toString()
       return item
     })
      this.valoresParaFiltro = result
      this.dataSource = result
      console.log(result)
    },
    erro => {
    }
  );
}
valores(){

  this.http.get<Pesquisarinterface[]>('http://localhost:8081/rada-laboratorios/metodo-referencia-pesquisa/listarMetodoReferencia')
  .subscribe(
    (resultado:any)=> {
      const result = resultado.map((item:any)=>{
        item.situacao = item.situacao.toString()
        return item
      })
       this.valoresParaFiltro = result
       this.dataSource = result
       console.log(result)
     },
     erro => {
     }
   );
 

}
buscarDados(){
  if(this.appForm.valid){
    this.dataSource = this.valoresParaFiltro
    const dadosFiltrados = this.dataSource.filter((item:any)=>{
      if(this.appForm.get('situacao')?.value != '[Todos]'){
        if(item.nomeMetodoReferencia != null && item.situacao != null){
          if(item.situacao == this.appForm.get('situacao')?.value){
            if(item.nomeMetodoReferencia.includes(this.appForm.get('metodoDeReferencia')?.value)){
              this.pesquisado = true
              return item
            }
          }
        }
      }else {
        if(item.nomeMetodoReferencia){
          if(item.nomeMetodoReferencia.includes(this.appForm.get('metodoDeReferencia')?.value)){
            this.pesquisado = true
            return item
          }
        }
      }
       
    })
    this.dataSource = dadosFiltrados
  }else {
    Object.keys(this.appForm.controls).forEach(field => { 
      const control = this.appForm.get(field);            
      control?.markAsTouched({ onlySelf: true });      
    });
  }

}

limpar(){
  this.pesquisado = false
  this.appForm.reset()
}
novo(){
  
  this.cadastroTab.emit(1)
}
deletar(id:any,situacao:string){
  if(situacao == "true"){
    this.openDialog(situacao,id)
  }else{
    return
  }
}
editar(id:any, nomeMetodoReferencia:any,descricao:any,situacao:any){
  this.formService.isFixed({id,nomeMetodoReferencia,descricao,situacao,editar:true});
  this.novo()
}

visualizar(nomeMetodoReferencia:any,descricao:any,situacao:any){
  this.formService.isFixed({nomeMetodoReferencia,descricao,situacao,visualizar:true});
  this.novo()
}

openDialog(situacao:string,id:any){
  const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
    width:'auto',
    data: {
      situacao,
      source:this.dataSource,
      id
    }
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result)
    this.dataSource = result
  });
}

validar(field:any){
  return this.appForm.get(field)?.hasError('required')
}
}

