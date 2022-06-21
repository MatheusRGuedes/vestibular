import {IVestibular} from './vestibular.model';
import {ICurso} from './curso.model';
import {ISala} from './sala.model';

export interface ICandidato {

  id: number;
  vestibular: IVestibular;
  nome: string;
  dataNascimento: Date;
  cpf: string;
  curso: ICurso;
  sala: ISala;

}
