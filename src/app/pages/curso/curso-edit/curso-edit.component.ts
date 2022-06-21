import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CursoService} from '../../../core/services/curso.service';
import {ICurso} from '../../../shared/models/curso.model';

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.component.html',
  styleUrls: ['./curso-edit.component.css']
})
export class CursoEditComponent implements OnInit {

  cursoUUID: string;
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
    this.cursoUUID = this.activatedRoute.snapshot.paramMap.get('cursoUUID');
    this.recuperarCurso();
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

  recuperarCurso() {
    this.cursoService.getOne(this.vestibularUUID, this.cursoUUID).subscribe((response) => {
      this.cursoForm.patchValue({
        nome: response.nome
      });
    }, (error) => {
      console.error(error);
    });
  }

  editar() {
    if (this.vestibularUUID) {

      if (this.cursoForm.invalid) {
        this.markAllAsDirty(this.cursoForm);
        return false;
      }

      const obj: ICurso = {
        nome: this.nome.value
      };

      this.cursoService.update(this.vestibularUUID, this.cursoUUID, obj).subscribe((success) => {
        this.router.navigate([`/vestibulares/` + this.vestibularUUID + `/cursos`]);
      }, (error) => {
        console.error(error);
      });
    } else {
      alert('Curso inválido!');
    }
  }

  // GETTERS DO FORMULÁRIO
  get nome(): FormControl {
    return this.cursoForm.get('nome') as FormControl;
  }
}
