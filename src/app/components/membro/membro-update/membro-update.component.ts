import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './../../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MembroService } from '../../../services/membro.service';
import { Component, OnInit } from '@angular/core';
import { Membro } from '../../../models/membro.model';
import { FormControl, Validators } from '@angular/forms';
import { Congregacao } from '../../../models/congregacao.model';

@Component({
  selector: 'app-membro-update',
  templateUrl: './membro-update.component.html',
  styleUrls: ['./membro-update.component.css']
})
export class MembroUpdateComponent implements OnInit {

  membro: Membro;
  usuario: Usuario;
  congregacao: Congregacao;
  congregacoes: Array<Congregacao> = [];
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private membroService: MembroService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");

    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    let codIgreja = this.usuario.codIgreja;

    this.firestore.collection('membro', ref => ref.where('igreja', '==', `${codIgreja}`).where('id', '==', id)).get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
          this.membro = doc.data() as Membro;
        });
    });
    
    this.firestore.collection('congregacao', ref => ref.where('igreja', '==', `${codIgreja}`)).get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
            this.congregacao = doc.data() as Congregacao;
            this.congregacoes.push(this.congregacao);
        });
    });
  }

  updateMembro(): void {
    this.membroService.update(this.membro);
    this.router.navigate(['/membros']);
  }

  cancel(): void {
    this.router.navigate(['/membros'])
  }
}
