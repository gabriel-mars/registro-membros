import { Membro } from './membro.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  baseUrl = "http://localhost:3001/membros";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 300,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(membro: Membro): Observable<Membro> {
    return this.http.post<Membro>(this.baseUrl, membro)
  }
}
