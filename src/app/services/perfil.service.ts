import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import { Usuario } from '../models/usuario.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  aux: Usuario = {
    nome: '',
    email: '',
    senha: ''
  };

  constructor(
    private toastService: ToastService,
    private firestore: AngularFirestore) { }

  update(usuario: Usuario): void {
    const userRef = this.firestore.collection('usuario').doc(`${usuario.email}`);
    userRef.get().toPromise()
    .then(doc => {
      if (!doc.exists) {
        this.toastService.showMessage('Usuário não encontrado!', false);
      } else {
        this.aux = doc.data() as Usuario;

        if (usuario.senha == '') {
          usuario.senha = this.aux.senha;
          this.firestore.doc(`usuario/${usuario.email}`).set(usuario);
          usuario.senha = '';
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.toastService.showMessage('Perfil atualizado!', true);
        } else {
          this.aux.senha = usuario.senha;
          this.firestore.doc(`usuario/${usuario.email}`).set(this.aux);
          this.aux.senha = '';
          localStorage.setItem('usuario', JSON.stringify(this.aux));
          this.toastService.showMessage('Senha atualizada!', true);
        }
      }
    })
    .catch(err => {
      this.toastService.showMessage('Ocorreu um erro!', false);
      console.log('Error getting document', err);
    });
  }
}
