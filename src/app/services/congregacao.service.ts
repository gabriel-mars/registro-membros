import { ToastService } from './toast.service';
import { Usuario } from '../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Congregacao } from '../models/congregacao.model';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})

export class CongregacaoService {
  usuario: Usuario;

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/congregacoes";

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private toastService: ToastService) { }

  create(congregacao: Congregacao): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    congregacao.igreja = this.usuario.igreja;
    this.firestore.collection('congregacao').add(congregacao);
    this.toastService.showMessage('Congregação cadastrada!', true);
  }

  getCongregacoes() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    let codIgreja = this.usuario.igreja;
    return this.firestore.collection('congregacao', ref => ref.where('igreja', '==', codIgreja)).valueChanges();
  }

  readById(id: number): Observable<Congregacao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Congregacao>(url).pipe(
      map((obj) => obj),
      catchError(e => this.toastService.errorHandler(e))
    );
  }

  update(congregacao: Congregacao): Observable<Congregacao> {
    const url = `${this.baseUrl}/${congregacao.id}`;
    return this.http.put<Congregacao>(url, congregacao).pipe(
      map((obj) => obj),
      catchError(e => this.toastService.errorHandler(e))
    );
  }

  delete(id: number): Observable<Congregacao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Congregacao>(url).pipe(
      map((obj) => obj),
      catchError(e => this.toastService.errorHandler(e))
    )
  }
}
