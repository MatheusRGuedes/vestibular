import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/core/services/curso.service';
import { ICurso } from 'src/app/shared/models/curso.model';

@Component({
  selector: 'app-curso-new',
  templateUrl: './curso-new.component.html',
  styleUrls: ['./curso-new.component.css']
})
export class CursoNewComponent implements OnInit {

  // Variáveis
  cursoForm :FormGroup;

  constructor(
    private fb :FormBuilder,
    private router :ActivatedRoute,
    private cursoService :CursoService
    ) {
    this.cursoForm = fb.group({
      "nome": fb.control('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  campoInvalido(campo :string) :boolean {
    return (
      !this.cursoForm.get(campo).valid && this.cursoForm.get(campo).dirty
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

      if (this.cursoForm.invalid) {
        this.markAllAsDirty(this.cursoForm);
        return false;
      }

      const obj :ICurso = {
        "nome": this.nome.value
      };

      this.cursoService.create(idVestibular, obj).subscribe((success) => {
          alert("Curso gravado com sucesso!");
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
  get nome() :FormControl {
    return this.cursoForm.get('nome') as FormControl;
  }
}
