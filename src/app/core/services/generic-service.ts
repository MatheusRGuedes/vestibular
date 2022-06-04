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

    /**
     * Return all registers.
     */
    findAll() {
        return this.http.get<T[]>( `${this.API_URL}`, this.options);
    }

    /**
     * Return only one existing register.
     */
    findOne(id: number) {
        return this.http.get<T>( `${this.API_URL}/${id}` );
    }

    private update(id: number, record: Object) {
        return this.http.put( `${this.API_URL}/${id}` , record);
    }

    private insert(record: Object) {
        return this.http.post( `${this.API_URL}` , record);
    }
    
    /**
     * Method for insert or update.
     * @param id Object identificator.
     * @param record New object to update.
     */
    save(id :number, record: Object) {
        if (id) {
          return this.update(id, record);
        } else {
          return this.insert(record);
        }
    }
    
    delete(id :number) {
        return this.http.delete( `${this.API_URL}/${id}` );
    }
}
