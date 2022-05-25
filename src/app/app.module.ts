import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './share/material/material.module';

import { AppComponent } from './app.component';
import { CoordenadoriaComponent } from './coordenadoria/coordenadoria.component';
import { DescricaodaacaoComponent } from './descricaodaacao/descricaodaacao.component';
import { ProdutoagricolaComponent } from './produtoagricola/produtoagricola.component';
import { EnvolvidosComponent } from './envolvidos/envolvidos.component';

//import { ThemePalette } from '@angular/material/core';
import { FiscalizadoComponent } from './fiscalizado/fiscalizado.component';
import { HttpService } from './Services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ThemeService } from './core/services/theme.service';
import { StoreModule } from '@ngrx/store';
import { DialogErrorsComponent } from './modal/dialog-errors/dialog-errors.component';
import {mudandoValor} from './store/finalizar-reducer';
import { RegistroAmostraComponent } from './registro-amostra/registro-amostra.component';
import { ReturnCodeDialogComponent } from './return-code-dialog/return-code-dialog.component';

import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CadastroMetodorefComponent } from './cadastro-metodoref/cadastro-metodoref.component';
import { PesquisarMetodorefComponent } from './pesquisar-metodoref/pesquisar-metodoref.component';
import { MetodoReferenciaComponent } from './metodo-referencia/metodo-referencia.component';

@NgModule({
  declarations: [
    AppComponent,
    CoordenadoriaComponent,
    DescricaodaacaoComponent,
    ProdutoagricolaComponent,
    EnvolvidosComponent,
    FiscalizadoComponent,
    ToolbarComponent,
    DialogErrorsComponent,
    RegistroAmostraComponent,
    ReturnCodeDialogComponent,
    MetodoReferenciaComponent,
    CadastroMetodorefComponent,
    PesquisarMetodorefComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,   
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    StoreModule.forRoot({lacreStatus:mudandoValor})   
  ],
  providers: [HttpService,ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
