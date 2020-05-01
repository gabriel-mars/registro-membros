import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congregacao-crud',
  templateUrl: './congregacao-crud.component.html',
  styleUrls: ['./congregacao-crud.component.css']
})
export class CongregacaoCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToCongregacaoCreate(): void {
    this.router.navigate(['/congregacoes/create']);
  }
}
