import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from 'src/app/core/services/sala.service';
import { ISala } from 'src/app/shared/models/sala.model';

@Component({
  selector: 'app-sala-new',
  templateUrl: './sala-new.component.html',
  styleUrls: ['./sala-new.component.css']
})
export class SalaNewComponent implements OnInit {

  // Variáveis
  salaForm :FormGroup;

  constructor(
    private fb :FormBuilder,
    private router :ActivatedRoute,
    private salaService :SalaService) 
    {
    this.salaForm = fb.group({
      "identificador": fb.control('', Validators.required),
      "bloco": fb.control('', Validators.required),
      "capacidade": fb.control('', [
        Validators.required, Validators.max(5)
      ])
    });
  }

  ngOnInit(): void {
  }

  campoInvalido(campo :string) :boolean {
    return (
      !this.salaForm.get(campo).valid && this.salaForm.get(campo).dirty
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

  salvar() {
    const idVestibular = this.router.snapshot.paramMap.get("idVestibular");
    if (idVestibular) {

      if (this.salaForm.invalid) {
        this.markAllAsDirty(this.salaForm);
        return false;
      }

      const obj :ISala = {
        "identificador": this.identificador.value,
        "bloco": this.bloco.value,
        "capacidade": Number.parseInt(this.capacidade.value)
      };

      this.salaService.create(idVestibular, obj).subscribe((success) => {
          alert("Sala gravada com sucesso!");
        }, (error) => {
          console.error(error);
      });
    } else {
      alert("Vestibular inválido!");
    }
  }

  editar() {
  }

  // GETTERS DO FORMULÁRIO
  get identificador() :FormControl {
    return this.salaForm.get('identificador') as FormControl;
  }
  get bloco() :FormControl {
    return this.salaForm.get('bloco') as FormControl;
  }
  get capacidade() :FormControl {
    return this.salaForm.get('capacidade') as FormControl;
  }
}
