import { MembroService } from '../../../services/membro.service';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-membro-read',
  templateUrl: './membro-read.component.html',
  styleUrls: ['./membro-read.component.css']
})
export class MembroReadComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'congregacao', 'action'];
  dataSource = new MembroDataSource(this.membroService);

  constructor(private membroService: MembroService) {}

  ngOnInit(): void {

  }
}

export class MembroDataSource extends DataSource<any> {
  constructor(private membroService: MembroService) {
    super();
  }

  connect() {
    return this.membroService.getMembros();
  }

  disconnect() {}
}
