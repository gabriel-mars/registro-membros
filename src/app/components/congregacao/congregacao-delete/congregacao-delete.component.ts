import { Usuario } from './../../../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { CongregacaoService } from '../../../services/congregacao.service';
import { Component, OnInit } from '@angular/core';
import { Congregacao } from '../../../models/congregacao.model';

@Component({
  selector: 'app-congregacao-delete',
  templateUrl: './congregacao-delete.component.html',
  styleUrls: ['./congregacao-delete.component.css']
})
export class CongregacaoDeleteComponent implements OnInit {
  usuario: Usuario;
  congregacao: Congregacao;
  aux: Congregacao;

  constructor(
    private congregacaoService: CongregacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.firestore.collection('congregacao').get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
            this.aux = doc.data() as Congregacao;
            if (this.aux.id == id) { this.congregacao = this.aux; }
        });
    });
  }

  deleteCongregacao(): void {
    this.congregacaoService.delete(this.congregacao.id);
    this.router.navigate(['/congregacoes']);
  }

  cancel(): void{
    this.router.navigate(['/congregacoes']);
  }
}
