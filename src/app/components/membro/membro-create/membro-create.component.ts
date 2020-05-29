import { Usuario } from './../../../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Membro } from '../../../models/membro.model';
import { MembroService } from '../../../services/membro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Congregacao } from '../../../models/congregacao.model';

@Component({
  selector: 'app-membro-create',
  templateUrl: './membro-create.component.html',
  styleUrls: ['./membro-create.component.css']
})
export class MembroCreateComponent implements OnInit {

  membro: Membro = {
    nome: '',
    cpf: '',
    congregacao: '',
    telefone: '',
    email: '',
    endereco: ''
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  congregacoes: Array<Congregacao> = [];
  usuario: Usuario;
  congregacao: Congregacao;
  
  constructor(
    private membroService: MembroService, 
    private router: Router,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    let codIgreja = this.usuario.codIgreja;
    this.firestore.collection('congregacao', ref => ref.where('igreja', '==', `${codIgreja}`)).get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
            this.congregacao = doc.data() as Congregacao;
            this.congregacoes.push(this.congregacao);
        });
    });
  }

  createMembro(): void {
    this.membroService.create(this.membro);
    this.router.navigate(['/membros']);
  }

  cancel(): void {
    this.router.navigate(['/membros']);
  }
}
