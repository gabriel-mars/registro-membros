import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: Usuario;
  aux: Usuario = {
    nome: '',
    email: '',
    senha: ''
  }

  mostrarComponentesEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private toastService: ToastService) { }

  readByEmail(usuario: Usuario): void {
    let userRef = this.firestore.collection('usuario').doc(`${usuario.email}`);
    userRef.get().toPromise()
    .then(doc => {
      if (!doc.exists) {
        this.toastService.showMessage('Usuário incorreto!', false);
      } else {
        this.aux = doc.data() as Usuario;
        
        if (this.aux.email === usuario.email && this.aux.senha === usuario.senha) {
          this.fazerLogin(this.aux);
        } else {
          this.toastService.showMessage('Senha incorreta!', false);
        }
      }
    })
    .catch(err => {
      this.toastService.showMessage('Ocorreu um erro!', false);
      console.log('Error getting document', err);
    });
  }

  fazerLogin(usuario: Usuario): void {
    this.mostrarComponentesEmitter.emit(true);
    this.mostrarLoginEmitter.emit(false);
    this.toastService.showMessage('Autenticado!', true);

    usuario.senha = '';
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate(['/home']);
  }
}
