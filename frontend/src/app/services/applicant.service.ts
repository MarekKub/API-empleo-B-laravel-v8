import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/User';
import {global} from './global';

@Injectable()
export class ApplicantService
{
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    )
    {
        this.url = global.url;
    }

    /**
     * MEtodo de testeo el servicio
     */
    test()
    {
       console.log("Hola mundo desde un servicio Applicant!");
    }

    
    /**
     *      Metodo que  ejecuta el metodo que guarda un registro
     * en la tabla 'applicants' de la DB
     * @param token Identifica al usuario
     * @param jobOffer OBjeto con los datos del jobOffer - oferta d trabajo a la que se a 
     * suscribir el usuario
     * @param id Integee con el id del usuario
     * @returns Peticion al metodo del Backend que registra el registro en la tabla applicants
     */
    create(token, jobOffer, id): Observable <any>{

        let json = JSON.stringify(jobOffer);   
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);
                               
        return this._http.post(this.url + 'applicant/store/' + id, params, {headers: headers});     
    }

   
    /**
     *      Metodo que recupera los registros applicants de la DB desde el backend.
     * Ejecuta el metodo del backend por get.
     * @returns JSON con un indice array con los registros applicants
     */
    getApplicants(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'applicant', {headers: headers});
    }

    // Meodo que devuelve solo un registro de la tabla applicants
    /**
     *      Metodo que ejecuta el metodo del backend que devuelve el 
     * registro apolicant solicitado, cuyo id se recibe por parametro.
     * @param token Token para comprobar que usuario esta identificado
     * @param id Entero que indica el regisro applicamt solicitada.
     * @returns JSON con un indice 'applicant' que almacena el applicnat solicitado.
     */
    getApplicant(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                    .set('Authorization', token);

        return this._http.get(this.url + 'applicant/' + id, {headers: headers});
    }


    /**
     *  Metodo que ejecuta el metodo del backend que devuelve el 
     * registro applicant solicitado que esta apuntado a la oferta de
     *  trabajo(job-offer), cuyo id se recibe por parametro.
     * @param token  Token para comprobar que usuario esta identificado
     * @param id Entero que indica el regisro applicamt solicitada.
     * @returns JSON con un indice 'applicant' que almacena un objeto con los registros
     * de la tabla applicant que están registrados en la job-offer(oferta de trabajo) solicitada.
     */
    getApplicantsByJobOffer(token,id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set('Authorization',token);
        
         return this._http.get(this.url + 'applicant/get-applicants-by-job-offer/' +id, {headers: headers});
    }

    /**
     *   Recupera de tabla applicant el registro solicitado a traves 
     * de parametro user_id que se le pasa
     * @param token Token para comprobar que usuario esta identificado
     * @param id Entero que indica el campo user_id por el que buscar 
     * el regisro applicamt solicitado.
     * @returns Ejecuta el metodo del backend que devuelve el registro solicitado
     */
    getApplicantByUserIdApplicant(token,id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set('Authorization',token);
        
        
        
         return this._http.get(this.url + 'applicant/get-applicant-by-user-id/' +id, {headers: headers});
    }


    /**
     *       Metodo que ejecuta el metodo del backend que devuelve el 
     * registro applicant solicitado cuyo id se recibe por parametro.
     * @param token Token para comprobar que usuario esta identificado
     * @param id Entero que representa el id del usuario a recuperar
     * @returns JSON Ejecuta el metodo del backend que devuelve los datos del usuario
     */
    getApplicantByUserId(token,id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set('Authorization',token);
        
         return this._http.get(this.url + 'user/detail/' +id, {headers: headers});
    }


    /**
     *      Metodo que recibe 3 parametros: 1) el token que serve para identificar al usuario
     * logueado, 2) el id de la JobOffer - oferta de trabajo de la  URL, y 3) y el user_id 
     * del objeto identity almacenado en Local Storage.
     *      
     * @param token Token para comprobar que usuario esta identificado
     * @param user_id Entero que representa el id del usuario a recuperar, se usa para buscar 
     * el registro applicant con el campo user_id
     * @param joboffer_id Entero que representa el id del jobOffer a recuperar, se usa para buscar 
     * el registro applicant con el campo JobOffer_id
     * @returns JSON Ejecuta el metodo del backend que devuelve los datos del applicant (candidato)
     */
    getApplicantByUserIdAndJobOfferId(token, joboffer_id, user_id): Observable <any>{

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set('Authorization',token); 

          return this._http.get(this.url + 'applicant/get-applicant-by-user-id-and-joboffer-id/' + joboffer_id +'/'+ user_id , {headers: headers});
    }

    /**
     *       Metodo que ejecuta el metodo del backend que devuelve los registros 
     * jobOffer de al tabla applicants  cuyo campo user_id es igual al valor
     * del parametor id recibido en metodo, es decir, a los que se ha suscrito el
     * usuario.
     * @param token Token para comprobar que usuario esta identificado
     * @param id Entero que representa el id del usuario a recuperar, se usa para buscar 
     * el registro applicant con el campo user_id
     * @returns JSON Eejcuta el metodo del backend que devuelve los datos del applicant (candidato)
     */
    getAllApplicantsObjectsByUserId(token,id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set('Authorization',token);
        
         return this._http.get(this.url + 'applicant/get-all-applicants-by-user-id/' +id, {headers: headers});
    }
}