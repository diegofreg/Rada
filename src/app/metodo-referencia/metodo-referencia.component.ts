import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThemeService } from '../core/services/theme.service';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-metodo-referencia',
  templateUrl: './metodo-referencia.component.html',
  styleUrls: ['./metodo-referencia.component.css']
})
export class MetodoReferenciaComponent implements OnInit {

  isDarkTheme!: Observable<boolean>;

  selected = 0

  valores:any = {
    nome:"",
    descricao:"",
    situacao:""
  }

  ngOnInit(): void {

    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
  
  constructor(private themeService: ThemeService,private formService:FormsService){}

  trocarTela(event:any){
    this.selected = event
  }

  back(event:any){
    this.selected = event
    if(this.selected == 0){
      this.formService.isFixed({visualizar:false});
    }
  }
}
