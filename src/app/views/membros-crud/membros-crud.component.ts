import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membros-crud',
  templateUrl: './membros-crud.component.html',
  styleUrls: ['./membros-crud.component.css']
})
export class MembrosCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Membros',
      icon: 'group',
      routeUrl: '/membros'
    };
  }

  ngOnInit(): void {
  }

  navigateToMembroCreate(): void {
    this.router.navigate(['/membros/create']);
  }
}
