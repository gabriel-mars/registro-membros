import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { MembroService } from '../../../services/membro.service';
import { Membro } from '../../../models/membro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membro-delete',
  templateUrl: './membro-delete.component.html',
  styleUrls: ['./membro-delete.component.css']
})
export class MembroDeleteComponent implements OnInit {

  membro: Membro;
  aux: Membro;

  constructor(
    private membroService: MembroService, 
    private router: Router, 
    private route: ActivatedRoute,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.firestore.collection('membro').get().toPromise()
    .then(snap => {
        snap.forEach(doc => {
            this.aux = doc.data() as Membro;
            if (this.aux.id == id) this.membro = this.aux;
        });
    });
  }

  deleteMembro(): void {
    this.membroService.delete(this.membro.id);
    this.router.navigate(['/membros']);
  }

  cancel(): void {
    this.router.navigate(['/membros']);
  }
}
