import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICandidato } from 'src/app/shared/models/candidato.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private readonly API_URL :string = `${environment.API_SPRING}vestibulares`;
  private options :{} = {};

  constructor(private http :HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': `${environment.API_SPRING}`
      })
    }
  }

  getAll(idVestibular :string) {
    return this.http.get<ICandidato[]>( `${this.API_URL}/${idVestibular}/candidatos`, this.options);
  }

  getOne(idVestibular :string, id: string) {
      return this.http.get<ICandidato>( `${this.API_URL}/${idVestibular}/candidatos/${id}` );
  }

  create(idVestibular :string , idCurso :string, record: ICandidato) {
      return this.http.post( `${this.API_URL}/${idVestibular}/cursos/${idCurso}/candidatos` , record);
  }

  update(idVestibular :string, idCurso :string, id: string, record: ICandidato) {
      return this.http.put( `${this.API_URL}/${idVestibular}/cursos/${idCurso}/candidatos/${id}` , record);
  }

  delete(idVestibular :string, idCurso :string, id :string) {
      return this.http.delete( `${this.API_URL}/${idVestibular}/cursos/${idCurso}/candidatos/${id}` );
  }
}
