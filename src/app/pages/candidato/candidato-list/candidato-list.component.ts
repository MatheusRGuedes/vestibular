import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ICandidato} from '../../../shared/models/candidato.model';
import {CandidatoService} from '../../../core/services/candidato.service';

@Component({
  selector: 'app-candidato-list',
  templateUrl: './candidato-list.component.html',
  styleUrls: ['./candidato-list.component.css']
})
export class CandidatoListComponent implements OnInit {

  vestibularUUID: string;
  cursoUUID: string;
  candidatos: ICandidato[];

  constructor(private service: CandidatoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.vestibularUUID = this.activatedRoute.snapshot.paramMap.get('idVestibular');
    this.cursoUUID = this.activatedRoute.snapshot.paramMap.get('cursoUUID');
  }

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista() {
    return this.service.getAll(this.vestibularUUID, this.cursoUUID).subscribe(
      (response) => {
        console.log('Candidatos --->', response);
        this.candidatos = response.candidatos;
      }, (error) => {
        console.error(error);
      });
  }

  editar(candidato: ICandidato) {
    console.log('Editar Candidato --->', candidato);
    this.router.navigate([`/vestibulares/` + this.vestibularUUID + `/cursos/` + this.cursoUUID + `/candidatos/edit/` + candidato.id]);
  }

  excluir(candidato: ICandidato) {
    if (confirm('Deseja excluir o candidato ?')) {
      this.service.delete(this.vestibularUUID, this.cursoUUID, candidato.id).subscribe((response) => {
        console.log('Candidatos --->', response);
        this.candidatos = response.candidatos;
      }, (error) => {
        console.error(error);
      });
    }
  }

}
