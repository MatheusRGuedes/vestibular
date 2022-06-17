import { Component, OnInit } from '@angular/core';
import { ICandidato } from 'src/app/shared/models/candidato.model';

@Component({
  selector: 'app-candidato-list',
  templateUrl: './candidato-list.component.html',
  styleUrls: ['./candidato-list.component.css']
})
export class CandidatoListComponent implements OnInit {

  // Variáveis
  listaCandidatos :ICandidato[] = []

  constructor() { }

  ngOnInit(): void {
    this.recuperarCandidatos();
  }

  recuperarCandidatos() {

  }

  editar(candidato :any) {

  }

  excluir(id :string) {

  }
}
