import { CongregacaoService } from './../../congregacao/congregacao.service';
import { Membro } from './../membro.model';
import { MembroService } from './../membro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Congregacao } from '../../congregacao/congregacao.model';

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

  congregacoes: Congregacao[]
  
  constructor(
    private membroService: MembroService, 
    private congregacaoService: CongregacaoService, 
    private router: Router) { }

  ngOnInit(): void {
    this.congregacaoService.read().subscribe(congregacoes => {
      this.congregacoes = congregacoes;
    })
  }

  createMembro(): void {
    this.membroService.create(this.membro).subscribe(() => {
      this.membroService.showMessage('Membro cadastrado!', true);
      this.router.navigate(['/membros']);
    });
    
  }

  cancel(): void {
    this.router.navigate(['/membros']);
  }
}
