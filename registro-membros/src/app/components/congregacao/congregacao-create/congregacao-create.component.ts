import { Router } from '@angular/router';
import { CongregacaoService } from './../congregacao.service';
import { Component, OnInit } from '@angular/core';
import { Congregacao } from '../congregacao.model';

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
  }

  constructor(private congregacaoService: CongregacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  createCongregacao(): void {
    this.congregacaoService.create(this.congregacao).subscribe(() => {
      this.congregacaoService.showMessage('Operação realizada!');
      this.router.navigate(['/congregacoes']);
    });
    
  }

  cancel(): void {
    this.router.navigate(['/congregacoes']);
  }
}
