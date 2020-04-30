import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatCardModule } from  '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { MembrosCrudComponent } from './views/membros-crud/membros-crud.component';
import { MembroCreateComponent } from './components/membro/membro-create/membro-create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MembroReadComponent } from './components/membro/membro-read/membro-read.component';
import { MembroUpdateComponent } from './components/membro/membro-update/membro-update.component';
import { MembroDeleteComponent } from './components/membro/membro-delete/membro-delete.component';
import { CongregacaoCrudComponent } from './views/congregacao-crud/congregacao-crud.component';
import { CongregacaoCreateComponent } from './components/congregacao/congregacao-create/congregacao-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    MembrosCrudComponent,
    MembroCreateComponent,
    MembroReadComponent,
    MembroUpdateComponent,
    MembroDeleteComponent,
    CongregacaoCrudComponent,
    CongregacaoCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
