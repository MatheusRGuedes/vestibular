import {Component, OnInit} from '@angular/core';
import {IVestibular} from '../../../shared/models/vestibular.model';
import {ISala} from '../../../shared/models/sala.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SalaService} from '../../../core/services/sala.service';

@Component({
  selector: 'app-sala-list',
  templateUrl: './sala-list.component.html',
  styleUrls: ['./sala-list.component.css']
})
export class SalaListComponent implements OnInit {

  vestibularUUID: string;
  salas: ISala[];

  constructor(private service: SalaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.vestibularUUID = this.activatedRoute.snapshot.paramMap.get('idVestibular');
  }

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista() {
    return this.service.getAll(this.vestibularUUID).subscribe(
      (response) => {
        console.log('Salas --->', response);
        this.salas = response.salas;
      }, (error) => {
        console.error(error);
      });
  }

  editar(sala: ISala) {
    console.log('Editar Sala --->', sala);
    this.router.navigate([`/vestibulares/` + this.vestibularUUID + `/salas/edit/` + sala.id]);
  }

  excluir(salaID: string) {
    if (confirm('Deseja excluir a sala ?')) {
      this.service.delete(this.vestibularUUID, salaID).subscribe((response) => {
        this.salas = response.salas;
        console.log('Salas --->', response);
      }, (error) => {
        console.error(error);
      });
    }
  }

}
