import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ICurso} from 'src/app/shared/models/curso.model';
import {Observable} from 'rxjs';
import {ICursos} from '../../shared/models/cursos.module';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private readonly API_URL: string = `/api/vestibulares`;

  constructor(private http: HttpClient) {
  }

  getAll(vestibularUUID: string): Observable<ICursos> {
    return this.http.get<ICursos>( `${this.API_URL}/${vestibularUUID}/cursos`);
  }

  getOne(vestibularUUID: string, cursoUUID: string): Observable<ICurso> {
    return this.http.get<ICurso>( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}`);
  }

  save(vestibularUUID: string, curso: any) {
    return this.http.post( `${this.API_URL}/${vestibularUUID}/cursos` , curso);
  }

  update(vestibularUUID: string, cursoUUID: string, curso: any) {
    return this.http.patch( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}` , curso);
  }

  delete(vestibularUUID: string, cursoUUID: string): Observable<ICursos> {
    return this.http.delete<ICursos>( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}` );
  }

}
