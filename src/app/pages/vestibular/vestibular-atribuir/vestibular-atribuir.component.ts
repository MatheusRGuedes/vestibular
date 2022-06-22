import {Component, OnInit} from '@angular/core';
import {ICandidato} from '../../../shared/models/candidato.model';
import {CandidatoService} from '../../../core/services/candidato.service';
import {ActivatedRoute} from '@angular/router';
import {ISala} from "../../../shared/models/sala.model";

@Component({
  selector: 'app-vestibular-atribuir',
  templateUrl: './vestibular-atribuir.component.html',
  styleUrls: ['./vestibular-atribuir.component.css']
})
export class VestibularAtribuirComponent implements OnInit {

  vestibularUUID: string;
  candidatos: ICandidato[];

  constructor(private activatedRoute: ActivatedRoute,
              private service: CandidatoService) {
  }

  ngOnInit(): void {
    this.vestibularUUID = this.activatedRoute.snapshot.paramMap.get('id');
    this.atribuirCandidatos();
  }

  atribuirCandidatos() {
    this.service.atribuirCandidatos(this.vestibularUUID).subscribe(
      (response) => {
        this.candidatos = response.candidatos;
        console.log('Candidatos --->', response);
      }, (error) => {
        console.error(error);
      });
  }

  retornarIdentificador(obj: ISala) {
    return obj != null ? obj.identificador : '---';
  }

}
