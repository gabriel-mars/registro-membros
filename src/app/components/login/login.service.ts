import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from './usuario.model';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: Usuario;

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/usuarios";

  mostrarComponentesEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private firestore: AngularFirestore ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 400,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-success"] : ["msg-error"]
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

  readByEmail(usuario: Usuario): Observable<Usuario> {
    
    let userRef = this.firestore.collection('usuario').doc(`${usuario.email}`);
    
    let getDoc = userRef.get().toPromise()
    .then(doc => {
      if (!doc.exists) {
        this.showMessage('Usuário e/ou senha incorretos!', false);
      } else {
        console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      this.showMessage('Ocorreu um erro!', false);
      console.log('Error getting document', err);
    });

    const url = `${this.baseUrl}/?email=${usuario.email}`;
    return this.http.get<Usuario>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', false);
    return EMPTY;
  }
}
