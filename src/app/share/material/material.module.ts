import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatMenuModule} from '@angular/material/menu'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatCommonModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCheckboxModule,
		MatDialogModule,
		MatExpansionModule,
		MatSnackBarModule,
    MatMenuModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatCommonModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCheckboxModule,
		MatDialogModule,
		MatExpansionModule,
		MatSnackBarModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
