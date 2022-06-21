import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ICandidatos} from '../../shared/models/candidatos.model';
import {ICandidato} from '../../shared/models/candidato.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private readonly API_URL: string = `/api/vestibulares`;

  constructor(private http: HttpClient) {
  }

  getAll(vestibularUUID: string, cursoUUID: string): Observable<ICandidatos> {
    let params = null;
    if (null !== cursoUUID) {
      params = new HttpParams().set('cursoUUID', cursoUUID);
    }
    return this.http.get<ICandidatos>( `${this.API_URL}/${vestibularUUID}/candidatos`, { params });
  }

  getOne(vestibularUUID: string, candidatoId: number): Observable<ICandidato> {
    return this.http.get<ICandidato>( `${this.API_URL}/${vestibularUUID}/candidatos/${candidatoId}`);
  }

  save(vestibularUUID: string, cursoUUID: string, candiato: any) {
    return this.http.post( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}/candidatos` , candiato);
  }

  atribuirCandidatos(vestibularUUID: string): Observable<ICandidatos> {
    return this.http.get<ICandidatos>(`${this.API_URL}/${vestibularUUID}/assing`);
  }

  update(vestibularUUID: string, cursoUUID: string, candidatoId: number, candidato: any) {
    return this.http.patch( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}/candidatos/${candidatoId}` , candidato);
  }

  delete(vestibularUUID: string, cursoUUID: string, candidatoId: number): Observable<ICandidatos> {
    return this.http.delete<ICandidatos>( `${this.API_URL}/${vestibularUUID}/cursos/${cursoUUID}/candidatos/${candidatoId}` );
  }

}
