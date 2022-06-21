import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidatoService} from '../../../core/services/candidato.service';
import {ICandidato} from '../../../shared/models/candidato.model';
import {DateService} from '../../../shared/utils/date.service';

@Component({
  selector: 'app-candidato-new',
  templateUrl: './candidato-edit.component.html',
  styleUrls: ['./candidato-edit.component.css']
})
export class CandidatoEditComponent implements OnInit {

  cursoUUID: string;
  vestibularUUID: string;
  candidatoId: number;
  candidatoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private service: CandidatoService) {
    this.candidatoForm = fb.group({
      nome : fb.control('', Validators.required),
      dataNascimento : fb.control('', Validators.required),
      cpf : fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.vestibularUUID = this.activatedRoute.snapshot.paramMap.get('idVestibular');
    this.cursoUUID = this.activatedRoute.snapshot.paramMap.get('cursoUUID');
    this.candidatoId = Number(this.activatedRoute.snapshot.paramMap.get('candidatoID'));
    this.recuperarCandidato();
  }

  campoInvalido(campo: string): boolean {
    return (
      !this.candidatoForm.get(campo).valid && this.candidatoForm.get(campo).dirty
    );
  }

  markAllAsDirty(form: FormGroup) {
    Object.keys(form.controls).forEach(campo => {
      const control = form.get(campo);

      if (control instanceof FormGroup) {
        this.markAllAsDirty(control);
      } else {
        control.markAsDirty();
      }
    });
  }

  recuperarCandidato() {
    this.service.getOne(this.vestibularUUID, this.candidatoId).subscribe((response) => {
      this.candidatoForm.patchValue({
        nome : response.nome,
        dataNascimento : DateService.dateToString(response.dataNascimento),
        cpf : response.cpf
      });
    }, (error) => {
      console.error(error);
    });
  }

  editar() {
    if (this.vestibularUUID && this.cursoUUID) {

      if (this.candidatoForm.invalid) {
        this.markAllAsDirty(this.candidatoForm);
        return false;
      }

      const obj: ICandidato = {
        nome: this.nome.value,
        dataNascimento: DateService.stringToDate(this.dataNascimento.value),
        cpf: this.cpf.value
      };

      this.service.update(this.vestibularUUID, this.cursoUUID, this.candidatoId, obj).subscribe((success) => {
        this.router.navigate([`/vestibulares/` + this.vestibularUUID + `/cursos/` + this.cursoUUID + `/candidatos`]);
      }, (error) => {
        console.error(error);
      });
    } else {
      alert('Candidato inválido!');
    }
  }

  get nome(): FormControl {
    return this.candidatoForm.get('nome') as FormControl;
  }

  get dataNascimento(): FormControl {
    return this.candidatoForm.get('dataNascimento') as FormControl;
  }

  get cpf(): FormControl {
    return this.candidatoForm.get('cpf') as FormControl;
  }

}
