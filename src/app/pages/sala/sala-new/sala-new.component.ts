import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SalaService } from 'src/app/core/services/sala.service';
import { ISala } from 'src/app/shared/models/sala.model';

@Component({
  selector: 'app-sala-new',
  templateUrl: './sala-new.component.html',
  styleUrls: ['./sala-new.component.css']
})
export class SalaNewComponent implements OnInit {

  vestibularUUID: string;
  salaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private salaService: SalaService) {

      this.vestibularUUID = this.activatedRoute.snapshot.paramMap.get('idVestibular');

      this.salaForm = fb.group({
        identificador: fb.control('', Validators.required),
        bloco: fb.control('', Validators.required),
        capacidade: fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
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

  salvar() {
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

      this.salaService.save(this.vestibularUUID, obj).subscribe((success) => {
          this.router.navigate([`/vestibulares/` + this.vestibularUUID + `/salas`]);
        }, (error) => {
          console.error(error);
      });
    } else {
      alert('Vestibular inválido!');
    }
  }

  editar() {
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
