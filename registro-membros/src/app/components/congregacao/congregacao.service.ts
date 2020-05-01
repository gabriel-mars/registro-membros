import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Congregacao } from './congregacao.model';

@Injectable({
  providedIn: 'root'
})

export class CongregacaoService {

  baseUrl = "http://localhost:3001/congregacoes";

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackbar.open(msg, 'X', {
      duration: 300,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-success"] : ["msg-success"]
    });
  }

  create(congregacao: Congregacao): Observable<Congregacao> {
    return this.http.post<Congregacao>(this.baseUrl, congregacao).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
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

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
