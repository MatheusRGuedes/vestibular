import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ICurso} from 'src/app/shared/models/curso.model';
import {Observable} from 'rxjs';
import {ICursos} from '../../shared/models/cursos.module';
import {ICandidatos} from "../../shared/models/candidatos.model";
import {ICandidato} from "../../shared/models/candidato.model";

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private readonly API_URL: string = `/api/vestibulares`;

  constructor(private http: HttpClient) {
  }

  getAll(vestibularUUID: string, cursoUUID: string): Observable<ICandidatos> {
    return this.http.get<ICandidatos>( `${this.API_URL}/${vestibularUUID}/candidatos`);
  }

  getOne(vestibularUUID: string, candidatoId: string): Observable<ICandidato> {
    return this.http.get<ICandidato>( `${this.API_URL}/${vestibularUUID}/candidatos/${candidatoId}`);
  }

  save(vestibularUUID: string, cursoUUID: string, candiato: any) {
    return this.http.post( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}/candidatos` , candiato);
  }

  atribuirCandidatos(vestibularUUID: string): Observable<ICandidatos> {
    return this.http.get<ICandidatos>(`${this.API_URL}/${vestibularUUID}/assing`);
  }

  update(vestibularUUID: string, cursoUUID: string, candidatoId: string, candidato: any) {
    return this.http.patch( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}/candidatos/${candidatoId}` , candidato);
  }

  delete(vestibularUUID: string, cursoUUID: string, candidatoId: string): Observable<ICandidatos> {
    return this.http.delete<ICandidatos>( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}/candidatos/${candidatoId}` );
  }

}
