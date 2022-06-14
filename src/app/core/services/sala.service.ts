import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISala } from 'src/app/shared/models/sala.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private readonly API_URL :string = `${environment.API_SPRING}vestibulares`;

  constructor(private http :HttpClient) {
  }

  getAll(idVestibular :string) {
    return this.http.get<ISala[]>( `${this.API_URL}/${idVestibular}/salas`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': `${environment.API_SPRING}`
      })
    });
  }

  getOne(idVestibular :string, id: string) {
      return this.http.get<ISala>( `${this.API_URL}/${idVestibular}/salas/${id}` );
  }

  create(idVestibular :string, record: Object) {
      return this.http.post( `${this.API_URL}/${idVestibular}/salas` , record);
  }

  update(idVestibular :string, id: string, record: Object) {
      return this.http.put( `${this.API_URL}/${idVestibular}/salas/${id}` , record);
  }

  delete(idVestibular :string, id :string) {
      return this.http.delete( `${this.API_URL}/${idVestibular}/salas/${id}` );
  }
}
