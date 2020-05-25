import { LoginService } from './login.service';
import { Usuario } from './usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mostrarLogin: boolean = true;
  hide = true;

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: ''
  }

  aux: Usuario = {
    nome: '',
    email: '',
    senha: ''
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  constructor(
    private loginService: LoginService,
    private firestore: AngularFirestore ) { }

  ngOnInit(): void {

  }

  login(): void {
    let userRef = this.firestore.collection('usuario').doc(`${this.usuario.email}`);
    let getDoc = userRef.get().toPromise()
    .then(doc => {
      if (!doc.exists) {
        this.loginService.showMessage('Usuário incorreto!', false);
      } else {
        this.aux = doc.data() as Usuario;
        
        if (this.aux.email === this.usuario.email && this.aux.senha === this.usuario.senha) {
          this.loginService.fazerLogin(this.aux);
        } else {
          this.loginService.showMessage('Senha incorreta!', false);
        }
      }
    })
    .catch(err => {
      this.loginService.showMessage('Ocorreu um erro!', false);
      console.log('Error getting document', err);
    });
  }
}
