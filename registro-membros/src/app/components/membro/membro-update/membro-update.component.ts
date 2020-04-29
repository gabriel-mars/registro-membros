import { Router, ActivatedRoute } from '@angular/router';
import { MembroService } from './../membro.service';
import { Component, OnInit } from '@angular/core';
import { Membro } from '../membro.model';

@Component({
  selector: 'app-membro-update',
  templateUrl: './membro-update.component.html',
  styleUrls: ['./membro-update.component.css']
})
export class MembroUpdateComponent implements OnInit {

  membro: Membro

  constructor(
    private membroService: MembroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.membroService.readById(id).subscribe(membro => {
      this.membro = membro;
    })
  }

  updateMembro(): void {
    this.membroService.update(this.membro).subscribe(membro => {
      this.membroService.showMessage('Membro atualizado!')
      this.router.navigate['/membros'];
    })
  }

  cancel(): void {
    this.router.navigate['/membros']
  }
}
