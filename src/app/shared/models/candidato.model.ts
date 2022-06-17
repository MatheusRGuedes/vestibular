import { ICurso } from "./curso.model";
import { ISala } from "./sala.model";
import { IVestibular } from "./vestibular.model";

export interface ICandidato {
    id? :string;
    nome :string;
    dataNascimento :Date;
    cpf :string;
    vestibular? :IVestibular;
    curso? :ICurso;
    sala? :ISala;
}