import { Router, ActivatedRoute } from '@angular/router';
import { MembroService } from '../../../services/membro.service';
import { Membro } from '../../../models/membro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membro-delete',
  templateUrl: './membro-delete.component.html',
  styleUrls: ['./membro-delete.component.css']
})
export class MembroDeleteComponent implements OnInit {

  membro: Membro;

  constructor(
    private membroService: MembroService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.membroService.readById(id).subscribe(membro => {
      this.membro = membro;
    })
  }

  deleteMembro(): void {
    this.membroService.delete(this.membro.id).subscribe(() => {
      //this.membroService.showMessage('Membro excluído!', true);
      this.router.navigate(['/membros']);
    })
  }

  cancel(): void {
    this.router.navigate(['/membros']);
  }
}
