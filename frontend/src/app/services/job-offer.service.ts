import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { JobOffer } from '../models/JobOffer';
import {global} from './global';

/**
 *   Servicio que recoge los metodos para ejecutar los metodos
 * del backend del controlador JobOfferController, manda y recibe
 * datos del backend.
 */
@Injectable()
export class JobOfferService
{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    test()
    {
        return "Hola mundo desde un servicio JobOffer!";
    }

    /**
     *    Metodo que  ejecuta el metodo que guarda una oferta de trabajo
     * en la tabla 'job_offers' de la DB
     * @param token Identifica al usuario
     * @param category Objeto recibibo del componente con los datos 
     * de la oferta de trabajo a guardar.
     * @returns Manda los datos con metodo post a la url que ejecuta 
     * el metodo del backend que guarda un nuevo registro en tabla 'categories'.
     */
    create(token, jobOffer): Observable <any> {
        jobOffer.content = global.htmlEntities(jobOffer.content);
        
        let json = JSON.stringify(jobOffer);
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.post(this.url + 'joboffer', params, { headers: headers});
    }

    /**
     *   Metodo que recupera las ofertas de trabajo de la DB desde el backend.
     * Ejecuta el metodo del backend por get.
     * @returns Array con las ofertas de trabajo - job_offers
     */
    getJobOffers(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'joboffer', {headers: headers});
    }

    /**
     *   Metodo que recupera la oferta de trabajo cuyo id se le pasa al metodo por
     * parametro, de la DB desde el backend.
     * Ejecuta el metodo show del backend por get.
     * @returns Array con las ofertas de trabajo - job_offers
     */
    getJobOffer(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'joboffer/' + id, {headers: headers});
    }

   // getJobOfferImage(id,)

    
    /**
     *   Metodo que recibe el id del usuario de role_id = 2y muestra las ofetas  que ha creado
     * Ejecuta el metodo show del backend por get.
     * @param token Variable que permite la identificacion del usuario
     * @param id Integer permite identificar la usuario por su id
     * @returns Array con las ofertas de trabajo - job_offers
     */
    getJobOffersByUser(token, id): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.get(this.url + 'joboffer/user/' + id, {headers: headers});
    }

    /**
     *    Metodo que actualiza el registro de un jobOffer, oferta de trabajo.
     * @param token Variable que permite la identificacion del usuario
     * @param jobOffer Variable que recibe el objeto con los datos del jobOffer actualizadis
     * @param id Integer permite identificar la jobOFfer
     * @returns 
     */
    update(token, jobOffer, id): Observable <any>{
        let json = JSON.stringify(jobOffer);
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.put(this.url + 'joboffer/' + id, params, {headers: headers});
    }

    

    /**
     *    Metodo que actualiza el campo status_id de la tabla job_offers a 1 para la 
     * el registro cuyo id se pasa por parametro.
     * @param token VariabLe que permite la identificacion del usuario
     * @param id Integer que identifica el registro de la tabla job_offers.
     * @returns 
     */
    updateJobOfferStatusChangeToOne(token, id): Observable <any>{

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.post(this.url + 'joboffer/update-filled-field-to-one/' + id, {headers: headers});
    }

    /**
     *      Metodo que actualiza el campo status_id de la tabla job_offers a 2 para la 
     * el registro cuyo id se pasa por parametro.
     * @param token VariabLe que permite la identificacion del usuario
     * @param id Integer que identifica el regisro de la tabla job_offers.
     * @returns 
     */
    updateJobOfferStatusChangeToTwo(token, id): Observable <any>{

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.post(this.url + 'joboffer/update-filled-field-to-two/' + id, {headers: headers});
    }
}