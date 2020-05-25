import { CongregacaoService } from '../../../services/congregacao.service';
import { Component, OnInit } from '@angular/core';
import { Congregacao } from '../../../models/congregacao.model';

@Component({
  selector: 'app-congregacao-read',
  templateUrl: './congregacao-read.component.html',
  styleUrls: ['./congregacao-read.component.css']
})
export class CongregacaoReadComponent implements OnInit {

  congregacoes: Congregacao[]
  displayedColumns = ['id', 'nome', 'bairro', 'action']

  constructor(private congregacaoService: CongregacaoService) { }

  ngOnInit(): void {
    this.congregacaoService.read().subscribe(congregacoes => {
      this.congregacoes = congregacoes
    })
  }
}
