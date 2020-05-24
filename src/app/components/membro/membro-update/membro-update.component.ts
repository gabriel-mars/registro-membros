import { CongregacaoService } from './../../congregacao/congregacao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MembroService } from './../membro.service';
import { Component, OnInit } from '@angular/core';
import { Membro } from '../membro.model';
import { FormControl, Validators } from '@angular/forms';
import { Congregacao } from '../../congregacao/congregacao.model';

@Component({
  selector: 'app-membro-update',
  templateUrl: './membro-update.component.html',
  styleUrls: ['./membro-update.component.css']
})
export class MembroUpdateComponent implements OnInit {

  membro: Membro;
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  congregacoes: Congregacao[]

  constructor(
    private membroService: MembroService,
    private congregacaoService: CongregacaoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id")
    this.membroService.readById(id).subscribe((membro) => {
      this.membro = membro;
    })
    this.congregacaoService.read().subscribe(congregacoes => {
      this.congregacoes = congregacoes;
    })
  }

  updateMembro(): void {
    this.membroService.update(this.membro).subscribe(() => {
      this.membroService.showMessage('Membro atualizado!', true)
      this.router.navigate(['/membros']);
    })
  }

  cancel(): void {
    this.router.navigate(['/membros'])
  }
}
