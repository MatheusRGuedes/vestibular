import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VestibularService } from 'src/app/core/services/vestibular.service';
import { IVestibular } from 'src/app/shared/models/vestibular.model';

@Component({
  selector: 'app-vestibular-list',
  templateUrl: './vestibular-list.component.html',
  styleUrls: ['./vestibular-list.component.css']
})
export class VestibularListComponent implements OnInit {

  // Variáveis
  listaVestibulares: IVestibular[];

  constructor(private service: VestibularService,
              private router: Router) { }

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista() {
    return this.service.getAll().subscribe(
      (response) => {
        this.listaVestibulares = response.vestibulares;
        console.log('Vestibulares --->', response);
      }, (error) => {
        console.error(error);
      });
  }

  editar(vestibular: IVestibular) {
    console.log(vestibular);
    this.router.navigate([`vestibulares/editar/${vestibular.vestibularUUID}`]);
  }

  excluir(vestibularUUID: string) {
    if (confirm('Deseja excluir o vestibular ?')) {
      this.service.delete(vestibularUUID).subscribe((response) => {
        this.listaVestibulares = response.vestibulares;
        console.log('Vestibulares --->', response);
      }, (error) => {
        console.error(error);
      });
    }
  }

}
