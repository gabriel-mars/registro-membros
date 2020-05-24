import { Router, ActivatedRoute } from '@angular/router';
import { CongregacaoService } from './../congregacao.service';
import { Component, OnInit } from '@angular/core';
import { Congregacao } from '../congregacao.model';

@Component({
  selector: 'app-congregacao-delete',
  templateUrl: './congregacao-delete.component.html',
  styleUrls: ['./congregacao-delete.component.css']
})
export class CongregacaoDeleteComponent implements OnInit {

  congregacao: Congregacao;

  constructor(
    private congregacaoService: CongregacaoService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.congregacaoService.readById(id).subscribe(congregacao => {
      this.congregacao = congregacao;
    })
  }

  deleteCongregacao(): void {
    this.congregacaoService.delete(this.congregacao.id).subscribe(() => {
      this.congregacaoService.showMessage('Congregação excluída!', true);
      this.router.navigate(['/congregacoes']);
    })
  }

  cancel(): void{
    this.router.navigate(['/congregacoes']);
  }
}
