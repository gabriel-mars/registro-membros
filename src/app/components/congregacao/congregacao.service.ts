import { Usuario } from './../login/usuario.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Congregacao } from './congregacao.model';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})

export class CongregacaoService {
  usuario: Usuario;

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/congregacoes";

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private firestore: AngularFirestore) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackbar.open(msg, 'X', {
      duration: 300,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-success"] : ["msg-error"]
    });
  }

  create(congregacao: Congregacao): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    congregacao.igreja = this.usuario.igreja;
    this.firestore.collection('congregacao').add(congregacao);
    this.showMessage('Congregação cadastrada!', true);
  }

  read(): Observable<Congregacao[]> {
    return this.http.get<Congregacao[]>(this.baseUrl);
  }

  readById(id: number): Observable<Congregacao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Congregacao>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(congregacao: Congregacao): Observable<Congregacao> {
    const url = `${this.baseUrl}/${congregacao.id}`;
    return this.http.put<Congregacao>(url, congregacao).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Congregacao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Congregacao>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
