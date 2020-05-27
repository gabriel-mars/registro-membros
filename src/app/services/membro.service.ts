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
  membro: Membro;

  baseUrl = "https://radiant-fortress-80374.herokuapp.com/membros";

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private toastService: ToastService) { }

  create(membro: Membro): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    membro.igreja = this.usuario.igreja;
    membro.id = parseInt(Math.random().toString(16).substr(2, 4));
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

  delete(id: number): void {
    this.firestore.collection('membro').get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
            let aux = doc.id;
            this.membro = doc.data() as Membro;
            
            if (this.membro.id == id){
              this.firestore.collection('membro').doc(`${aux}`).delete()
              .then(() => {
                this.toastService.showMessage('Membro removido!', true);
              })
              .catch((error) => {
                this.toastService.showMessage('Ocorreu um erro.', false);
                console.log(error);
              });
            }
        });
    });
  }
}
