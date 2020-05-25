import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'registro-membros';

  mostrarComponente: boolean = false;
  mostrarLogin: boolean = true;

  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.loginService.mostrarComponentesEmitter.subscribe(
      show => this.mostrarComponente = show
    );

    this.loginService.mostrarLoginEmitter.subscribe(
      show => this.mostrarLogin = show
    );
  }
}
