import { MembroService } from '../../../services/membro.service';
import { Membro } from '../../../models/membro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membro-read',
  templateUrl: './membro-read.component.html',
  styleUrls: ['./membro-read.component.css']
})
export class MembroReadComponent implements OnInit {

  membros: Membro[]
  displayedColumns = ['id', 'nome', 'congregacao', 'action']

  constructor(private membroService: MembroService) { }

  ngOnInit(): void {
    this.membroService.read().subscribe(membros => {
      this.membros = membros
    })
  }
}
