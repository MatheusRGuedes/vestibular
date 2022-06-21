import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SalaService} from '../../../core/services/sala.service';
import {ISala} from '../../../shared/models/sala.model';
import {DateService} from "../../../shared/utils/date.service";

@Component({
  selector: 'app-sala-edit',
  templateUrl: './sala-edit.component.html',
  styleUrls: ['./sala-edit.component.css']
})
export class SalaEditComponent implements OnInit {

  salaID: string;
  vestibularUUID: string;
  salaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private salaService: SalaService) {

    this.salaID = this.activatedRoute.snapshot.paramMap.get('salaID');
    this.vestibularUUID = this.activatedRoute.snapshot.paramMap.get('idVestibular');

    this.salaForm = fb.group({
      identificador: fb.control('', Validators.required),
      bloco: fb.control('', Validators.required),
      capacidade: fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.recuperarSala();
  }

  campoInvalido(campo: string): boolean {
    return (
      !this.salaForm.get(campo).valid && this.salaForm.get(campo).dirty
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

  recuperarSala() {
    this.salaService.getOne(this.vestibularUUID, this.salaID).subscribe((response) => {
        console.log('Sala recuperada --->', response);
        this.salaForm.patchValue({
          identificador: response.identificador,
          bloco: response.bloco,
          capacidade: response.capacidade
        });
      }, (error) => {
        console.error(error);
      });
  }

  editar() {
    if (this.vestibularUUID) {

      if (this.salaForm.invalid) {
        this.markAllAsDirty(this.salaForm);
        return false;
      }

      const obj: ISala = {
        identificador: this.identificador.value,
        bloco: this.bloco.value,
        capacidade: Number.parseInt(this.capacidade.value)
      };

      this.salaService.update(this.vestibularUUID, this.salaID, obj).subscribe((success) => {
        this.router.navigate([`/vestibulares/` + this.vestibularUUID + `/salas`]);
      }, (error) => {
        console.error(error);
      });
    } else {
      alert('Sala inválido!');
    }
  }

  // GETTERS DO FORMULÁRIO
  get identificador(): FormControl {
    return this.salaForm.get('identificador') as FormControl;
  }
  get bloco(): FormControl {
    return this.salaForm.get('bloco') as FormControl;
  }
  get capacidade(): FormControl {
    return this.salaForm.get('capacidade') as FormControl;
  }
}
