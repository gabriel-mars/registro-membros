import { LoginService } from './login.service';
import { Usuario } from './usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
  
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

  }

  login(): void {
    this.loginService.readByEmail(this.usuario).subscribe((aux) => {
      this.aux = aux[0];
      
      if (this.aux === null || this.aux === undefined) {
        this.loginService.showMessage('Usuário e/ou senha incorretos', false);
      } else {
        if (this.aux.email === this.usuario.email && this.aux.senha === this.usuario.senha) {
          this.loginService.fazerLogin(this.aux);
        }
      }
    });
  }
}
