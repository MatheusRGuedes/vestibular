import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from 'src/app/core/services/candidato.service';
import { VestibularService } from 'src/app/core/services/vestibular.service';
import { ICandidato } from 'src/app/shared/models/candidato.model';
import { ComboGenerica } from 'src/app/shared/models/combo-generica.model';
import { DateService } from 'src/app/shared/utils/date.service';

@Component({
  selector: 'app-candidato-list',
  templateUrl: './candidato-list.component.html',
  styleUrls: ['./candidato-list.component.css']
})
export class CandidatoListComponent implements OnInit {

  // Variáveis
  formPesquisa :FormGroup;
  chaveVestibular :string;
  listaVestibulares :ComboGenerica[] = [
    {valor: '1', descricao: 'teste1'},
    {valor: '2', descricao: 'teste2'}
  ];
  listaCandidatos :ICandidato[] = [
    {id: '1', nome: 'matheus', dataNascimento: new Date(), cpf: '17136009'},
    {id: '2', nome: 'teste', dataNascimento: new Date("01-20-2000"), cpf: '123356957655'}
  ];

  constructor(
    private fb :FormBuilder,
    private router :Router,
    private activatedRoute :ActivatedRoute,
    private vestibularService :VestibularService,
    private candidatoService :CandidatoService
    ) {
    this.formPesquisa = fb.group({
      "idVestibular": fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getChaveVestibular();
    this.recuperarVestibulares();
  }

  getChaveVestibular() {
    this.chaveVestibular = this.activatedRoute.snapshot.paramMap.get('idVestibular');
  }

  campoInvalido(campo :string) :boolean {
    return (
      !this.formPesquisa.get(campo).valid && this.formPesquisa.get(campo).dirty
    )
  }

  recuperarVestibulares() {
    if (this.listaVestibulares.length === 0) {
      this.vestibularService.getAll().subscribe((response) => {
        response.forEach(obj => this.listaVestibulares.push({
          "valor": obj.id,
          "descricao": DateService.dateToString(obj.dataInicio) +" - "+ DateService.dateToString(obj.dataInicio) 
        }))
        
        if (this.listaVestibulares.length === 1) {
          this.idVestibular = this.listaVestibulares[0].valor;
        }
      })
    }
  }

  pesquisar() {
    if (!this.formPesquisa.valid) {
      this.idVestibular.markAsDirty();
      return false;
    }
    this.candidatoService.getAll(this.idVestibular.value)
      .subscribe((response) => {
        console.log(response);
        this.listaCandidatos = response;
      }, (error) => {
        console.error(error);
    })
  }

  editar(candidato :any) {
    //console.log(candidato);
    this.router.navigate([`vestibulares/${this.chaveVestibular}/candidatos/editar/${candidato.id}`]);
  }

  excluir(id :string) {

  }

  get idVestibular() :any {
    return this.formPesquisa.get('idVestibular') as FormControl;
  }
  set idVestibular(value :any) {
    this.formPesquisa.get('idVestibular').setValue(value);
  }
}
