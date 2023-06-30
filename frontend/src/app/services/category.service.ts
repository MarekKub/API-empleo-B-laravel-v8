import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Category } from '../models/Category';
import {global} from './global';

/**
 *   Servicio que recoge los metodos para ejecutar los metodos
 * del backend del controlador CategoryController, manda y recibe
 * datos del backend.
 */
@Injectable()
export class CategoryService 
{
    public url: string;

    constructor(
        private _http: HttpClient
    )
    {
        this.url = global.url;
    }

    /**
     *    Metodo que  ejecuta el metodo que guarda una categoria
     * en la tabla 'categories' de la DB
     * @param token Identifica al usuario
     * @param category Objeto recibibo del componente con los datos 
     * de la catogoria a guardar.
     * @returns Manda los datos con metodo post a la url que ejecuta 
     * el metodo del backend que guarda un nuevo registro en tabla 'categories'.
     */
    create(token, category): Observable<any>
    {
        let json = JSON.stringify(category);   
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.post(this.url + 'category', params, {headers: headers});
    }

    /**
     *   Metodo que recupera las categorias de la DB desde el backend.
     * Ejecuta el metodo del backend por get.
     * @returns JSON con un indice array con las categorias
     */
    getCategories(): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');  
        return this._http.get(this.url + 'category', {headers: headers}); 
    }

    /**
     *       Metodo que ejecuta el metodo del backend que devuelve la categoria solicitada, cuyo
     * id se recibe por parametro.
     * @param id Entero que indica la categoria solicitada.
     * @returns JSON con un indice 'category' que almacena la categoria solicitada.
     */
    getCategory(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');  
        return this._http.get(this.url + 'category/' + id, {headers: headers}); 
    }

    /**
     *       Metodo que ejecuta el metodo del backend que devuelve las jobOffers = ofertas de trabajo
     * de la categoria pasado por parametro.
     * @param id Entero que indica la categoria solicitada.
     * @returns JSON con un indice 'category' que almacena la categoria solicitada.
     */
    getJobOffers(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');  
        return this._http.get(this.url + 'joboffer/category/' + id, {headers: headers}); 
    }
    
}