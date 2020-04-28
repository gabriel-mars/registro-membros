import { Membro } from './../membro.model';
import { MembroService } from './../membro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membro-create',
  templateUrl: './membro-create.component.html',
  styleUrls: ['./membro-create.component.css']
})
export class MembroCreateComponent implements OnInit {

  membro: Membro = {
    nome: "Gabriel Rodrigo Martins da Silva",
    congregacao: "Eletrônica"
  }

  constructor(private membroService: MembroService, private router: Router) { }

  ngOnInit(): void {
  }

  createMembro(): void {
    this.membroService.create(this.membro).subscribe(() => {
      this.membroService.showMessage('Operação realizada!');
      this.router.navigate(['/membros']);
    });
    
  }

  cancel(): void {
    this.router.navigate(['/membros']);
  }
}
