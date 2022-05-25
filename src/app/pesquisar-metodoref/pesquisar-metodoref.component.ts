import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsService} from '../forms.service';
import { HttpService } from '../Services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Pesquisarinterface } from './pesquisar-interface';




@Component({
  selector: 'app-pesquisar-metodoref',
  templateUrl: './pesquisar-metodoref.component.html',
  styleUrls: ['./pesquisar-metodoref.component.css']
})

export class PesquisarMetodorefComponent implements OnInit {

  pesquisar: Pesquisarinterface [] = [];
  
  displayedColumns: string[] = ['acoes', 'nomeMetodoReferencia', 'descricao', 'situacao'];
  dataSource: any = []


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  //ngAfterViewInit(): void {
    
    //this.dataSource.paginator = this.paginator;
  //}

//  dataSource: Pesquisarinterface[] = [

//    { id: 1, descricao: 'xxx', situacao: 'Teste'}
    
//  ];

  

//  displayedColumns = ['descricao', 'situacao']

  constructor(private formBuilder: FormBuilder, private formService:FormsService, private http: HttpService) { 

    this.appForm = this.formBuilder.group({
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
   (resultado:Pesquisarinterface[])=> {
      this.dataSource = resultado
      console.log(this.dataSource)
    },
    erro => {
    }
  );
}

}

