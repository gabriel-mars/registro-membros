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
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MembroReadComponent } from './components/membro/membro-read/membro-read.component';
import { MembroUpdateComponent } from './components/membro/membro-update/membro-update.component';
import { MembroDeleteComponent } from './components/membro/membro-delete/membro-delete.component';
import { CongregacaoCrudComponent } from './views/congregacao-crud/congregacao-crud.component';
import { CongregacaoCreateComponent } from './components/congregacao/congregacao-create/congregacao-create.component';
import { CongregacaoReadComponent } from './components/congregacao/congregacao-read/congregacao-read.component';
import { CongregacaoUpdateComponent } from './components/congregacao/congregacao-update/congregacao-update.component';
import { CongregacaoDeleteComponent } from './components/congregacao/congregacao-delete/congregacao-delete.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SenhaComponent } from './components/senha/senha.component';

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
    CongregacaoCreateComponent,
    CongregacaoReadComponent,
    CongregacaoUpdateComponent,
    CongregacaoDeleteComponent,
    LoginComponent,
    PerfilComponent,
    SenhaComponent
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
    MatTableModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
