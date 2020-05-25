import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from './usuario.model';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
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

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/usuarios";

  mostrarComponentesEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private firestore: AngularFirestore) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 400,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-success"] : ["msg-error"]
    });
  }

  readByEmail(usuario: Usuario): void {
    let userRef = this.firestore.collection('usuario').doc(`${usuario.email}`);
    let getDoc = userRef.get().toPromise()
    .then(doc => {
      if (!doc.exists) {
        this.showMessage('Usuário incorreto!', false);
      } else {
        this.aux = doc.data() as Usuario;
        
        if (this.aux.email === usuario.email && this.aux.senha === usuario.senha) {
          this.fazerLogin(this.aux);
        } else {
          this.showMessage('Senha incorreta!', false);
        }
      }
    })
    .catch(err => {
      this.showMessage('Ocorreu um erro!', false);
      console.log('Error getting document', err);
    });
  }

  fazerLogin(usuario: Usuario): void {
    this.mostrarComponentesEmitter.emit(true);
    this.mostrarLoginEmitter.emit(false);
    this.showMessage('Autenticado!', true);

    usuario.senha = '';
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate(['/home']);
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', false);
    return EMPTY;
  }
}
