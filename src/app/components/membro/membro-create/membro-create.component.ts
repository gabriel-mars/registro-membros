import { Usuario } from './../../../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { CongregacaoService } from '../../../services/congregacao.service';
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

  dataSource = new CongregacaoDataSource(this.congregacaoService);
  congregacoes: Congregacao[];
  usuario: Usuario;
  
  constructor(
    private membroService: MembroService, 
    private congregacaoService: CongregacaoService, 
    private router: Router,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    let codIgreja = this.usuario.igreja;
    let citiesRef = this.firestore.collection('congregacoes', ref => ref.where('igreja', '==', `${codIgreja}`)).valueChanges();
    let query = citiesRef.toPromise()
    .then(snapshot => {
      console.log(snapshot);
  })
  .catch(err => {
    console.log('Error getting documents', err);
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

export class CongregacaoDataSource extends DataSource<any> {
  constructor(private congregacaoService: CongregacaoService) {
    super()
  }
 
  connect() {
    return this.congregacaoService.getCongregacoes();
  }
 
  disconnect() {}
}
