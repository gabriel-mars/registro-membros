import { Usuario } from './../login/usuario.model';
import { Router } from '@angular/router';
import { PerfilService } from './perfil.service';
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
    private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  readByupdate(): void {
    this.perfilService.readById(this.usuario.id).subscribe((usuario) => {
      this.aux = usuario;
      this.update(this.aux);
    });
  }

  update(aux: Usuario): void {
    aux.telefone = this.usuario.telefone;
    aux.nome = this.usuario.nome;
    aux.email = this.usuario.email;
    aux.igreja = this.usuario.igreja;

    this.perfilService.update(aux).subscribe(() => {
      localStorage.setItem('usuario', JSON.stringify(aux));
      this.perfilService.showMessage('Dados atualizados!', true);
      this.router.navigate(['/perfil']);
    });
  }
}
