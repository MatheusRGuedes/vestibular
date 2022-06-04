import { ICandidato } from "./candidato.model";
import { ICurso } from "./curso.model";
import { ISala } from "./sala.model";

export interface IVestibular {
    id: string,
    dataInicio: Date,
    dataFim: Date,
    cursos?: ICurso[],
    salas?: ISala[],
    candidatos?: ICandidato[]
}