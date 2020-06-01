import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/usuario.model';
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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  constructor( private loginService: LoginService ) { }

  ngOnInit(): void {

  }

  login(): void {
    localStorage.clear();
    this.loginService.readByEmail(this.usuario);
  }
}
