import { Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { ThemeService } from './core/services/theme.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  
  
})
export class AppComponent {
  isDarkTheme!: Observable<boolean>;
  dataAtual!: Date;
	
  title = 'termo-coleta';
  clickedTab = 'Registro de Amostra'
	tabs = [
		{
			nameTab:'Termo de Coleta',
			isClicked:false
		},
		{
			nameTab:'Registro de Amostra',
			isClicked:true
		},
		{
			nameTab:'Relátorios de Ensaio',
			isClicked:false
		},
		{
			nameTab:'Cadastros',
			isClicked:false,
			isMenu:true
		},
		

	]

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
	  console.log(environment.production)
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.dataAtual =  new Date();
  }

	mudandoTela(clickedItem:any){
		
		this.tabs.forEach(item => {
			if(item.isClicked){
				item.isClicked = false
				clickedItem.isClicked = true
			}
		})
		
	if(clickedItem.nameTab != 'Cadastros' ){

	this.clickedTab = clickedItem.nameTab	
	}
		
	}
	metodoDeReferencia(nome:string){

		this.clickedTab = nome

	}

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
export class MenuOverviewExample {}

