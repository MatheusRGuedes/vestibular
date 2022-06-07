import { HttpClient, HttpHeaders } from "@angular/common/http";

/* 
    Classe genérica para serviço de requisição

    --> É feito 2 requisições a solicitação real e uma permissão da primeira
*/
export class GenericService<T> {

    private options : {} = {};
    
    constructor(protected http: HttpClient, private API_URL :string) {
        this.options = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': "" //definir url da api
            })
        }
    }

    getAll() {
        return this.http.get<T[]>( `${this.API_URL}`, this.options);
    }

    getOne(id: string) {
        return this.http.get<T>( `${this.API_URL}/${id}` );
    }

    create(record: Object) {
        return this.http.post( `${this.API_URL}` , record);
    }

    update(id: string, record: Object) {
        return this.http.put( `${this.API_URL}/${id}` , record);
    }

    delete(id :string) {
        return this.http.delete( `${this.API_URL}/${id}` );
    }
}
