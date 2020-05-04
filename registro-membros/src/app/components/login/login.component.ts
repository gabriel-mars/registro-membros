import { LoginService } from './login.service';
import { Usuario } from './usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mostrarLogin: boolean = true;

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: ''
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.fazerLogin(this.usuario);
  }
}
