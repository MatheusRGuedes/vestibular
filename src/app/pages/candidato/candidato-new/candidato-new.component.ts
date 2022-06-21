import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CursoService } from 'src/app/core/services/curso.service';
import { VestibularService } from 'src/app/core/services/vestibular.service';
import { CandidatoService } from 'src/app/core/services/candidato.service';
import { DateService } from 'src/app/shared/utils/date.service';

import { ComboGenerica } from 'src/app/shared/models/combo-generica.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidato-new',
  templateUrl: './candidato-new.component.html',
  styleUrls: ['./candidato-new.component.css']
})
export class CandidatoNewComponent implements OnInit {

  // Variáveis
  candidatoForm :FormGroup;
  urlPath :string;
  chaveVestibular :string;
  listaVestibulares :ComboGenerica[] = [
    { valor: '1', descricao: 'vest1' },
    { valor: '2', descricao: 'vest2' },
    { valor: '3', descricao: 'vest3' }
  ];
  listaCursos :ComboGenerica[] = [
    { valor: '1', descricao: 'curso1' },
    { valor: '2', descricao: 'curso2' }
  ];

  constructor(
    private fb :FormBuilder,
    private activatedRoute :ActivatedRoute,
    private vestibularService :VestibularService,
    private cursoService :CursoService,
    private candidatoService :CandidatoService
    ) {
    this.candidatoForm = fb.group({
      "nome": fb.control('', Validators.required),
      "dataNascimento": fb.control('', Validators.required),
      "cpf": fb.control('', Validators.required),
      "idVestibular": fb.control('', Validators.required),
      "idCurso": fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getRouteInformations();
    this.recuperarVestibulares();
    this.recuperaCandidato();
  }

  getRouteInformations() {
    this.activatedRoute.url.subscribe((urlSegment) => {
      this.urlPath = urlSegment[0].path;
    });
    this.chaveVestibular = this.activatedRoute.snapshot.paramMap.get('idVestibular');
  }

  campoInvalido(campo :string) :boolean {
    return (
      !this.candidatoForm.get(campo).valid && this.candidatoForm.get(campo).dirty
    )
  }

  // Marca todos os campos como inválidos
  markAllAsDirty(form : FormGroup) {
    //console.log("recurção!");
    Object.keys(form.controls).forEach(campo => {
      //console.log(campo);
      const control = form.get(campo);
      
      if (control instanceof FormGroup) {
        this.markAllAsDirty(control);
      } else {
        control.markAsDirty();
      }
    })
  }

  recuperarVestibulares() {
    if (this.listaVestibulares.length === 0) {
      this.vestibularService.getAll().subscribe((vestibulares) => {
        vestibulares.forEach(obj => this.listaVestibulares.push({
          "valor": obj.id,
          "descricao": DateService.dateToString(obj.dataInicio) +" - "+ DateService.dateToString(obj.dataInicio) 
        }))
      })
    }
  }

  recuperarCursos(vestibular :any) {
    //console.log(vestibular);
    const idVestibular = vestibular.value;
    this.listaCursos = [];
    //this.idCurso.setValue('');

    if (idVestibular) {
      this.cursoService.getAll(idVestibular).subscribe((cursos) => {
        cursos.forEach(obj => this.listaCursos.push({
          "valor": obj.id,
          "descricao": obj.nome 
        }))
      })
    }
  }

  recuperaCandidato() {
    if (this.urlPath !== 'editar') return false;

    const chave = this.activatedRoute.snapshot.paramMap.get('id');
    const idVestibular = this.activatedRoute.snapshot.paramMap.get('idVestibular');
    if (chave && idVestibular) {
      console.log("Recuperando Candidato para edição: ");

      this.candidatoService.getOne(idVestibular, chave)
        .subscribe((response) => {
          console.log(response);
          
          this.candidatoForm.patchValue({
            "nome": response.nome,
            "dataNascimento": DateService.dateToString(response.dataNascimento),
            "cpf": response.cpf,
            "idVestibular": response.vestibular.id,
            "idCurso": response.curso.id
          })
        }, (error) => {
          console.error(error);
        })
    }
  }

  salvar() {
    if (!this.candidatoForm.valid) {
      this.markAllAsDirty(this.candidatoForm);
      return false;
    }
    const idVestibular = this.idVestibular.value;
    const idCurso = this.idCurso.value;
    const obj = {
      "nome": this.nome.value,
      "dataNascimento": DateService.stringToDate(this.dataNascimento.value),
      "cpf": this.cpf.value
    }

    if (this.urlPath !== 'editar') {
      this.candidatoService.create(idVestibular, idCurso, obj)
        .subscribe((success) => {
          alert("Candidato criado com sucesso!");
        }, (error) => {
          console.log(error);
      })
    } else {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      this.candidatoService.update(idVestibular, idCurso, id, obj)
        .subscribe((success) => {
          alert("Candidato atualizado com sucesso!");
        }, (error) => {
          console.log(error);
      })
    }
  }


  // GETTERS DO FORMULÁRIO
  get nome() :FormControl {
    return this.candidatoForm.get('nome') as FormControl;
  }
  get dataNascimento() :FormControl {
    return this.candidatoForm.get('dataNascimento') as FormControl;
  }
  get cpf() :FormControl {
    return this.candidatoForm.get('cpf') as FormControl;
  }
  get idVestibular() :FormControl {
    return this.candidatoForm.get('idVestibular') as FormControl;
  }
  get idCurso() :FormControl {
    return this.candidatoForm.get('idCurso') as FormControl;
  }
}
