import { HeaderService } from './../template/header/header.service';
import { Usuario } from './../login/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from './../perfil/perfil.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css']
})
export class SenhaComponent implements OnInit {

  usuario: Usuario;
  aux: Usuario = {
    nome: '',
    email: '',
    senha: ''
  };
  hide = true;

  constructor(
    private perfilService: PerfilService,
    private headerService: HeaderService,
    private router: Router) {
      headerService.headerData = {
        title: 'Senha',
        icon: 'vpn_key',
        routeUrl: '/perfil/senha'
      }
    }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.perfilService.readById(this.usuario.id).subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  updateSenha(): void {
    if (this.aux.senha != null && this.aux.nome != null && this.aux.email != null) {
      if (this.aux.senha === this.aux.email) {
        if (this.aux.nome === this.usuario.senha) {
          this.usuario.senha = this.aux.senha;
          this.perfilService.update(this.usuario).subscribe(() => {
            this.perfilService.showMessage("Senha atualizada!", true);
            this.router.navigate(['/perfil']);
          });
        } {
          this.perfilService.showMessage("Informe sua senha atual!", false);
        }
      } else {
        this.perfilService.showMessage("Nova senha e confirmação devem ser iguais!", false);
      }
    } else {
      this.perfilService.showMessage("Preencha os dados corretamente!", false);
    }
  }

  cancel(): void {
    this.router.navigate(['/perfil']);
  }
}
