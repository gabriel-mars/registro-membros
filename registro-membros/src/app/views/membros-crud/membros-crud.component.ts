import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membros-crud',
  templateUrl: './membros-crud.component.html',
  styleUrls: ['./membros-crud.component.css']
})
export class MembrosCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToMembroCreate(): void {
    this.router.navigate(['/membros/create']);
  }
}
