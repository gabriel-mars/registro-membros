import { HeaderService } from './../../components/template/header/header.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congregacao-crud',
  templateUrl: './congregacao-crud.component.html',
  styleUrls: ['./congregacao-crud.component.css']
})
export class CongregacaoCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Congregações',
      icon: 'location_city',
      routeUrl: '/congregacoes'
    };
  }

  ngOnInit(): void {
  }

  navigateToCongregacaoCreate(): void {
    this.router.navigate(['/congregacoes/create']);
  }
}
