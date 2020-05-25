import { Membro } from './membro.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})

export class MembroService {

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/membros";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private firestore: AngularFirestore) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 300,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-success"] : ["msg-error"]
    });
  }

  create(membro: Membro): void {
    this.firestore.collection('membro').doc(membro.cpf).set(membro);
    this.showMessage('Membro cadastrado!', true);
  }

  read(): Observable<Membro[]> {
    return this.http.get<Membro[]>(this.baseUrl);
  }

  readById(id: number): Observable<Membro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Membro>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(membro: Membro): Observable<Membro> {
    const url = `${this.baseUrl}/${membro.id}`;
    return this.http.put<Membro>(url, membro).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Membro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Membro>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
