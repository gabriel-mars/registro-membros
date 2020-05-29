import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from './../../services/toast.service';
import { HeaderService } from './../template/header/header.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
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
  pass: String;

  hide = true;

  constructor(
    private perfilService: PerfilService,
    private headerService: HeaderService,
    private router: Router,
    private toastService: ToastService,
    private firestore: AngularFirestore) {
      headerService.headerData = {
        title: 'Senha',
        icon: 'vpn_key',
        routeUrl: '/perfil/senha'
      }
    }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    let codIgreja = this.usuario.igreja;

    this.firestore.collection('usuario', ref => ref.where('igreja', '==', `${codIgreja}`).where('email', '==', this.usuario.email)).get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
          this.usuario = doc.data() as Usuario;
        });
    });
  }

  updateSenha(): void {
    if (this.aux.senha != null && this.aux.nome != null && this.aux.email != null) {
      if (this.aux.senha === this.aux.email) {
        if (this.aux.nome === this.usuario.senha) {
          this.usuario.senha = this.aux.senha;
          this.perfilService.update(this.usuario);
          this.router.navigate(['/perfil']);
        } else {
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
