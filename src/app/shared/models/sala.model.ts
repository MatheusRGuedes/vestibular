import { ICandidato } from './candidato.model';
import { IVestibular } from './vestibular.model';

export interface ISala {
    id?: string;
    identificador: string;
    bloco: string;
    capacidade: number;
    vestibular?: IVestibular;
    candidatos?: ICandidato[];
}
