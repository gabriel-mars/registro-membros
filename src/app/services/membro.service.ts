import { ToastService } from './toast.service';
import { Usuario } from '../models/usuario.model';
import { Membro } from '../models/membro.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})

export class MembroService {
  usuario: Usuario;

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/membros";

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private toastService: ToastService) { }

  create(membro: Membro): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    membro.igreja = this.usuario.igreja;
    this.firestore.collection('membro').doc(membro.cpf).set(membro);
    this.toastService.showMessage('Membro cadastrado!', true);
  }

  getMembros() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    let codIgreja = this.usuario.igreja;
    return this.firestore.collection('membro', ref => ref.where('igreja', '==', codIgreja)).valueChanges();
  }

  readById(id: number): Observable<Membro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Membro>(url).pipe(
      map((obj) => obj),
      catchError(e => this.toastService.errorHandler(e))
    );
  }

  update(membro: Membro): Observable<Membro> {
    const url = `${this.baseUrl}/${membro.id}`;
    return this.http.put<Membro>(url, membro).pipe(
      map((obj) => obj),
      catchError(e => this.toastService.errorHandler(e))
    );
  }

  delete(id: number): Observable<Membro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Membro>(url).pipe(
      map((obj) => obj),
      catchError(e => this.toastService.errorHandler(e))
    );
  }
}
