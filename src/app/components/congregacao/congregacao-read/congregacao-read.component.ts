import { CongregacaoService } from '../../../services/congregacao.service';
import { Component, OnInit } from '@angular/core';
import { Congregacao } from '../../../models/congregacao.model';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-congregacao-read',
  templateUrl: './congregacao-read.component.html',
  styleUrls: ['./congregacao-read.component.css']
})
export class CongregacaoReadComponent implements OnInit {

  displayedColumns = ['nome', 'bairro', 'action'];
  dataSource = new CongregacaoDataSource(this.congregacaoService);

  constructor(private congregacaoService: CongregacaoService) {}

  ngOnInit(): void {
  }
}

export class CongregacaoDataSource extends DataSource<any> {
  constructor(private congregacaoService: CongregacaoService) {
    super()
  }
 
  connect() {
    return this.congregacaoService.getCongregacoes();
  }
 
  disconnect() {}
}
