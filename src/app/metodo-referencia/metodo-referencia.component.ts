import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-metodo-referencia',
  templateUrl: './metodo-referencia.component.html',
  styleUrls: ['./metodo-referencia.component.css']
})
export class MetodoReferenciaComponent implements OnInit {

  isDarkTheme!: Observable<boolean>;

  ngOnInit(): void {

    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
  
  constructor(
    private themeService: ThemeService
    ){

      
    }

}
