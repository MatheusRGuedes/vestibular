import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ICurso} from '../../../shared/models/curso.model';
import {CursoService} from '../../../core/services/curso.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {

  vestibularUUID: string;
  cursos: ICurso[];

  constructor(private service: CursoService,
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
        console.log('Cursos --->', response);
        this.cursos = response.cursos;
      }, (error) => {
        console.error(error);
      });
  }

  editar(curso: ICurso) {
    console.log('Editar Sala --->', curso);
    this.router.navigate([`/vestibulares/` + this.vestibularUUID + `/cursos/edit/` + curso.cursoUUID]);
  }

  excluir(cursoUUID: string) {
    if (confirm('Deseja excluir o curso ?')) {
      this.service.delete(this.vestibularUUID, cursoUUID).subscribe((response) => {
        console.log('Cursos --->', response);
        this.cursos = response.cursos;
      }, (error) => {
        console.error(error);
      });
    }
  }

}
