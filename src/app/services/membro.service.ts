import { ToastService } from './toast.service';
import { Usuario } from '../models/usuario.model';
import { Membro } from '../models/membro.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class MembroService {
  usuario: Usuario;
  membro: Membro;

  constructor(
    private firestore: AngularFirestore,
    private toastService: ToastService) { }

  create(membro: Membro): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    membro.igreja = this.usuario.codIgreja;
    membro.id = Math.floor(Math.random() * 1001);
    this.firestore.collection('membro').doc(membro.cpf).set(membro);
    this.toastService.showMessage('Membro cadastrado!', true);
  }

  getMembros() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    const codIgreja = this.usuario.codIgreja;
    return this.firestore.collection('membro', ref => ref.where('igreja', '==', codIgreja)).valueChanges();
  }

  update(membro: Membro): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    const codIgreja = this.usuario.codIgreja;

    this.firestore.collection('membro', ref => ref.where('igreja', '==', `${codIgreja}`).where('id', '==', membro.id)).get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
          this.membro = doc.data() as Membro;
          this.firestore.doc(`membro/${doc.id}`).set(membro);
          this.toastService.showMessage('Membro atualizado!', true);
        });
    })
    .catch(err => {
      this.toastService.showMessage('Ocorreu um erro!', false);
      console.log('Error getting document', err);
    });
  }

  delete(id: number): void {
    this.firestore.collection('membro').get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
            const aux = doc.id;
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
