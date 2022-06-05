import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVestibular } from 'src/app/shared/models/vestibular.model';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic-service';

@Injectable({
  providedIn: 'root'
})
export class VestibularService {

  private readonly API_URL :string = `${environment.API_SPRING}vestibulares`;
  private readonly genericService :GenericService<IVestibular>;

  constructor(private http: HttpClient) {
    this.genericService = new GenericService(http, this.API_URL);
  }

  todos() {
    return this.genericService.findAll();
  }

  encontrar(id :string) {
    return this.genericService.findOne(id);
  }

  gravar(id :string, vestibular :IVestibular) {
    return this.genericService.save(id, vestibular);
  }

  deletar(id :string) {
    return this.genericService.delete(id);
  }
}
