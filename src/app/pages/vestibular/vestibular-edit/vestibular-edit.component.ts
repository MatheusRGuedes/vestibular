import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { VestibularService } from 'src/app/core/services/vestibular.service';
import { DateService } from 'src/app/shared/utils/date.service';

@Component({
  selector: 'app-vestibular-edit',
  templateUrl: './vestibular-edit.component.html',
  styleUrls: ['./vestibular-edit.component.css']
})
export class VestibularEditComponent implements OnInit {

  // variáveis
  vestibularForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private vestibularService: VestibularService,
    private router: Router
  ) {
    this.vestibularForm = fb.group({
      dataInicio: fb.control('', Validators.required),
      dataFim: fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.recuperarVestibular();
  }

  recuperarVestibular() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

    this.vestibularService.getOne(id)
      .subscribe((response) => {
        console.log('Vestibular recuperado --->', response);
        this.vestibularForm.patchValue({
          dataInicio: DateService.dateToString(response.dataInicio),
          dataFim: DateService.dateToString(response.dataFim)
        });
      }, (error) => {
        console.error(error);
    });
  }

  campoInvalido(campo: string): boolean {
    return (
      !this.vestibularForm.get(campo).valid && this.vestibularForm.get(campo).dirty
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

  editar() {
    if (!this.vestibularForm.valid) {
      this.markAllAsDirty(this.vestibularForm);
    } else {
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      const obj = {
        "dataInicio": DateService.stringToDate(this.dataInicio.value),
        "dataFim": DateService.stringToDate(this.dataFim.value)
      };

      this.vestibularService.update(id, obj).subscribe((success) => {
        this.router.navigate([`vestibulares`]);
      }, (error) => {
        console.error(error);
      });
    }
  }

  get dataInicio(): FormControl {
    return this.vestibularForm.get('dataInicio') as FormControl;
  }
  get dataFim(): FormControl {
    return this.vestibularForm.get('dataFim') as FormControl;
  }
}
