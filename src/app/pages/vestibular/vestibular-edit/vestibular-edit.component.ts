import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { VestibularService } from 'src/app/core/services/vestibular.service';
import { DateService } from 'src/app/shared/utils/date.service';

@Component({
  selector: 'app-vestibular-edit',
  templateUrl: './vestibular-edit.component.html',
  styleUrls: ['./vestibular-edit.component.css']
})
export class VestibularEditComponent implements OnInit {

  //variáveis
  vestibularForm :FormGroup;

  constructor(
    private fb :FormBuilder,
    private activatedRoute :ActivatedRoute,
    private vestibularService :VestibularService
  ) {
    this.vestibularForm = fb.group({
      dataInicio: fb.control("", Validators.required),
      dataFim: fb.control("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.recuperarVestibular();
  }

  recuperarVestibular() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(id);

    this.vestibularService.getOne(id)
      .subscribe((vestibular) => {
        this.vestibularForm.patchValue({
          "dataInicio": DateService.dateToString(vestibular.dataInicio),
          "dataFim": DateService.dateToString(vestibular.dataFim)
        });
      }, (error) => {
        console.error(error);
    })
  }

  campoInvalido(campo :string) :boolean {
    return (
      !this.vestibularForm.get(campo).valid && this.vestibularForm.get(campo).dirty
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

  editar() {
    if (!this.vestibularForm.valid) {
      this.markAllAsDirty(this.vestibularForm);
    } else {
      const id = this.activatedRoute.snapshot.paramMap.get("id");
      
      const obj = {
        "dataInicio": DateService.stringToDate(this.dataInicio.value), 
        "dataFim": DateService.stringToDate(this.dataFim.value) 
      };

      this.vestibularService.update(id, obj).subscribe((success) => {
        alert("Vestibular Atualizado com sucesso!");
      }, (error) => {
        console.error(error);
      });
    }
  }

  // Getters do formulário
  get dataInicio() :FormControl {
    return this.vestibularForm.get('dataInicio') as FormControl;
  }
  get dataFim() :FormControl {
    return this.vestibularForm.get('dataFim') as FormControl;
  }
}
