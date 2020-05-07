import { Router, ActivatedRoute } from '@angular/router';
import { CongregacaoService } from './../congregacao.service';
import { Component, OnInit } from '@angular/core';
import { Congregacao } from '../congregacao.model';

@Component({
  selector: 'app-congregacao-update',
  templateUrl: './congregacao-update.component.html',
  styleUrls: ['./congregacao-update.component.css']
})
export class CongregacaoUpdateComponent implements OnInit {

  congregacao: Congregacao;

  constructor(
    private congregacaoService: CongregacaoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.congregacaoService.readById(id).subscribe((congregacao) => {
      this.congregacao = congregacao;
    })
  }

  updateCongregacao(): void {
    this.congregacaoService.update(this.congregacao).subscribe(() => {
      this.congregacaoService.showMessage('Congregação atualizada!', true);
      this.router.navigate(['/congregacoes']);
    })
  }

  cancel(): void {
    this.router.navigate(['/congregacoes']);
  }

}
