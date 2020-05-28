import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  aux: Usuario = {
    nome: '',
    email: '',
    senha: ''
  }

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/usuarios";

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private firestore: AngularFirestore) { }

  readById(id: number): Observable<Usuario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      map((obj) => obj),
      catchError(e => this.toastService.errorHandler(e))
    );
  }

  update(usuario: Usuario): void {
    let userRef = this.firestore.collection('usuario').doc(`${usuario.email}`);
    userRef.get().toPromise()
    .then(doc => {
      if (!doc.exists) {
        this.toastService.showMessage('Usuário não encontrado!', false);
      } else {
        this.aux = doc.data() as Usuario;
        
        usuario.senha = this.aux.senha;
        this.aux = usuario;
        this.firestore.doc(`usuario/${usuario.email}`).set(this.aux);
        this.aux.senha = '';

        localStorage.setItem('usuario', JSON.stringify(this.aux));
        this.toastService.showMessage('Perfil atualizado!', true);
      }
    })
    .catch(err => {
      this.toastService.showMessage('Ocorreu um erro!', false);
      console.log('Error getting document', err);
    });
  }
}
