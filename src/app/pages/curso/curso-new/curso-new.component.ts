import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { CursoService } from 'src/app/core/services/curso.service';
import { ICurso } from 'src/app/shared/models/curso.model';

@Component({
  selector: 'app-curso-new',
  templateUrl: './curso-new.component.html',
  styleUrls: ['./curso-new.component.css']
})
export class CursoNewComponent implements OnInit {

  vestibularUUID: string;
  cursoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService
    ) {
    this.cursoForm = fb.group({
      nome : fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.vestibularUUID = this.activatedRoute.snapshot.paramMap.get('idVestibular');
  }

  campoInvalido(campo: string): boolean {
    return (
      !this.cursoForm.get(campo).valid && this.cursoForm.get(campo).dirty
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

      if (this.cursoForm.invalid) {
        this.markAllAsDirty(this.cursoForm);
        return false;
      }

      const obj: ICurso = {
        nome: this.nome.value
      };

      this.cursoService.save(this.vestibularUUID, obj).subscribe((success) => {
          this.router.navigate([`/vestibulares/` + this.vestibularUUID + `/cursos`]);
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
  get nome(): FormControl {
    return this.cursoForm.get('nome') as FormControl;
  }
}
