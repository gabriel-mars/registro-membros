import { Usuario } from './../../../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { CongregacaoService } from '../../../services/congregacao.service';
import { Component, OnInit } from '@angular/core';
import { Congregacao } from '../../../models/congregacao.model';

@Component({
  selector: 'app-congregacao-update',
  templateUrl: './congregacao-update.component.html',
  styleUrls: ['./congregacao-update.component.css']
})
export class CongregacaoUpdateComponent implements OnInit {

  congregacao: Congregacao;
  usuario: Usuario;

  constructor(
    private congregacaoService: CongregacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    const codIgreja = this.usuario.codIgreja;

    this.firestore.collection('congregacao', ref => ref.where('igreja', '==', `${codIgreja}`).where('id', '==', id)).get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
          this.congregacao = doc.data() as Congregacao;
        });
    });
  }

  updateCongregacao(): void {
    this.congregacaoService.update(this.congregacao);
    this.router.navigate(['/congregacoes']);
  }

  cancel(): void {
    this.router.navigate(['/congregacoes']);
  }

}
