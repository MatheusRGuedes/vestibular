import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IVestibular} from 'src/app/shared/models/vestibular.model';
import {Observable} from 'rxjs';
import {IVestibulares} from '../../shared/models/vestibulares.model';

@Injectable({
  providedIn: 'root'
})
export class VestibularService {

  private readonly API_URL: string = `/api/vestibulares`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IVestibulares> {
    return this.http.get<IVestibulares>( `${this.API_URL}`);
  }

  getOne(vestibularUUID: string): Observable<IVestibular> {
    return this.http.get<IVestibular>( `${this.API_URL}/${vestibularUUID}`);
  }

  save(vestibular: any) {
    return this.http.post( `${this.API_URL}` , vestibular);
  }

  update(vestibularUUID: string, vestibular: any) {
    return this.http.patch( `${this.API_URL}/${vestibularUUID}` , vestibular);
  }

  delete(vestibularUUID: string): Observable<IVestibulares> {
    return this.http.delete<IVestibulares>( `${this.API_URL}/${vestibularUUID}` );
  }
}
