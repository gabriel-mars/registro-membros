import { HeaderService } from './../template/header/header.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  aux: Usuario;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private perfilService: PerfilService,
    private headerService: HeaderService,
    private router: Router) {
      headerService.headerData = {
        title: 'Perfil',
        icon: 'person',
        routeUrl: '/perfil'
      }
    }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  readByupdate(): void {
    this.update(this.usuario);
  }

  update(aux: Usuario): void {
    aux.telefone = this.usuario.telefone;
    aux.nome = this.usuario.nome;
    aux.email = this.usuario.email;
    aux.igreja = this.usuario.igreja;

    this.perfilService.update(aux);
    this.router.navigate(['/perfil']);
  }

  updateSenha(): void {
    this.router.navigate(['/perfil/senha']);
  }
}
