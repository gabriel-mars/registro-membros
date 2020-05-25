import { ToastService } from './../../services/toast.service';
import { HeaderService } from './../template/header/header.service';
import { Usuario } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';
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
    private router: Router,
    private toastService: ToastService) {
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
          //this.perfilService.update(this.usuario).subscribe(() => {
            //this.toastService.showMessage("Senha atualizada!", true);
            //this.router.navigate(['/perfil']);
          //});
        } {
          this.toastService.showMessage("Informe sua senha atual!", false);
        }
      } else {
        this.toastService.showMessage("Nova senha e confirmação devem ser iguais!", false);
      }
    } else {
      this.toastService.showMessage("Preencha os dados corretamente!", false);
    }
  }

  cancel(): void {
    this.router.navigate(['/perfil']);
  }
}
