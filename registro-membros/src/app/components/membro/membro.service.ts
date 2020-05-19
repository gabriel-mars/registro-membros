import { Membro } from './membro.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MembroService {

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/membros";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 300,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-success"] : ["msg-error"]
    });
  }

  create(membro: Membro): Observable<Membro> {
    return this.http.post<Membro>(this.baseUrl, membro).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
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
