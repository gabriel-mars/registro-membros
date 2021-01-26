import { Router } from '@angular/router';
import { CongregacaoService } from '../../../services/congregacao.service';
import { Component, OnInit } from '@angular/core';
import { Congregacao } from '../../../models/congregacao.model';

@Component({
  selector: 'app-congregacao-create',
  templateUrl: './congregacao-create.component.html',
  styleUrls: ['./congregacao-create.component.css']
})
export class CongregacaoCreateComponent implements OnInit {

  congregacao: Congregacao = {
    nome: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    dirigente: ''
  };

  constructor(private congregacaoService: CongregacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  createCongregacao(): void {
    this.congregacaoService.create(this.congregacao);
    this.router.navigate(['/congregacoes']);
  }

  cancel(): void {
    this.router.navigate(['/congregacoes']);
  }
}
