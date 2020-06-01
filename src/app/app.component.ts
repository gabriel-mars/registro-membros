import { Usuario } from './models/usuario.model';
import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'registro-membros';

  usuario: Usuario;

  mostrarComponente: boolean = false;
  mostrarLogin: boolean = true;

  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    if (this.usuario != null) {
      this.mostrarComponente = true;
      this.mostrarLogin = false;
      this.loginService.fazerLogin(this.usuario);
    } else {
      this.loginService.mostrarComponentesEmitter.subscribe(
        show => this.mostrarComponente = show
      );
  
      this.loginService.mostrarLoginEmitter.subscribe(
        show => this.mostrarLogin = show
      );
    }
  }
}
