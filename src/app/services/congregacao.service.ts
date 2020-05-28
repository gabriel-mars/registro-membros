import { ToastService } from './toast.service';
import { Usuario } from '../models/usuario.model';
import { Injectable } from '@angular/core';
import { Congregacao } from '../models/congregacao.model';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})

export class CongregacaoService {
  usuario: Usuario;
  congregacao: Congregacao;

  constructor(
    private firestore: AngularFirestore,
    private toastService: ToastService) { }

  create(congregacao: Congregacao): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    congregacao.igreja = this.usuario.igreja;
    congregacao.id = Math.floor(Math.random() * 101);
    this.firestore.collection('congregacao').add(congregacao);
    this.toastService.showMessage('Congregação cadastrada!', true);
  }

  getCongregacoes() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    let codIgreja = this.usuario.igreja;
    return this.firestore.collection('congregacao', ref => ref.where('igreja', '==', codIgreja)).valueChanges();
  }

  update(congregacao: Congregacao): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    let codIgreja = this.usuario.igreja;
    
    this.firestore.collection('congregacao', ref => ref.where('igreja', '==', `${codIgreja}`).where('id', '==', congregacao.id)).get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
          this.congregacao = doc.data() as Congregacao;
          this.firestore.doc(`congregacao/${doc.id}`).set(congregacao);
          this.toastService.showMessage('Congregação atualizada!', true);
        })    
    })
    .catch(err => {
      this.toastService.showMessage('Ocorreu um erro!', false);
      console.log('Error getting document', err);
    });
  }

  delete(id: number): void {
    this.firestore.collection('congregacao').get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
            let aux = doc.id;
            this.congregacao = doc.data() as Congregacao;
            
            if (this.congregacao.id == id){
              this.firestore.collection('congregacao').doc(`${aux}`).delete()
              .then(() => {
                this.toastService.showMessage('Congregação removida!', true);
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
