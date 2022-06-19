import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ISala} from 'src/app/shared/models/sala.model';
import {Observable} from "rxjs";
import {ISalas} from "../../shared/models/salas.model";

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private readonly API_URL: string = `/api/vestibulares`;

  constructor(private http: HttpClient) {
  }

  getAll(vestibularUUID: string): Observable<ISalas> {
    return this.http.get<ISalas>( `${this.API_URL}/${vestibularUUID}/salas`);
  }

  getOne(vestibularUUID: string, salaID: string): Observable<ISala> {
    return this.http.get<ISala>( `${this.API_URL}/${vestibularUUID}/salas/${salaID}`);
  }

  save(vestibularUUID: string, sala: any) {
    return this.http.post( `${this.API_URL}/${vestibularUUID}/salas` , sala);
  }

  update(vestibularUUID: string, salaID: string, sala: any) {
    return this.http.patch( `${this.API_URL}/${vestibularUUID}/salas/${salaID}` , sala);
  }

  delete(vestibularUUID: string, salaID: string): Observable<ISalas> {
    return this.http.delete<ISalas>( `${this.API_URL}/${vestibularUUID}/salas/${salaID}` );
  }
}
