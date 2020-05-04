import { Router } from '@angular/router';
import { Usuario } from './usuario.model';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "http://localhost:3001/usuarios";

  mostrarComponentesEmitter = new EventEmitter<boolean>();
  mostrarLoginEmitter = new EventEmitter<boolean>();

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 300,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-success"] : ["msg-success"]
    });
  }

  fazerLogin(usuario: Usuario): void {

    this.mostrarComponentesEmitter.emit(true);
    this.mostrarLoginEmitter.emit(false);
    this.router.navigate(['/home']);
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
