import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VestibularService } from 'src/app/core/services/vestibular.service';
import { DateService } from 'src/app/shared/utils/date.service';
import {Router} from "@angular/router";

@Component({
  selector: 'vestibular-new',
  templateUrl: './vestibular-new.component.html',
  styleUrls: ['./vestibular-new.component.css']
})
export class VestibularNewComponent implements OnInit {

  //variáveis
  vestibularForm: FormGroup;

  constructor(private fb: FormBuilder,
              private vestibularService: VestibularService,
              private router: Router) {
    this.vestibularForm = fb.group({
      dataInicio: fb.control('', Validators.required),
      dataFim: fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  campoInvalido(campo: string): boolean {
    return (
      !this.vestibularForm.get(campo).valid && this.vestibularForm.get(campo).dirty
    );
  }

  salvar() {
    if (!this.vestibularForm.valid) {
      this.markAllAsDirty(this.vestibularForm);
    } else {
      const obj = {
        "dataInicio": DateService.stringToDate(this.dataInicio.value),
        "dataFim": DateService.stringToDate(this.dataFim.value)
      };

      this.vestibularService.save(obj).subscribe((success) => {
        this.router.navigate([`vestibulares`]);
      }, (error) => {
        console.error(error);
      });
    }
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

  get dataInicio(): FormControl {
    return this.vestibularForm.get('dataInicio') as FormControl;
  }
  get dataFim(): FormControl {
    return this.vestibularForm.get('dataFim') as FormControl;
  }
}
