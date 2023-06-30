import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {global} from './global';

/**
 *   Servicio que recoge los metodos para ejecutar los metodos
 * del backend del controlador UserController, manda y recibe
 * datos del backend.
 */
@Injectable()
export class UserService 
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

    test()
    {
        return "Hola mundo desde un servicio User!";
    }

    /**
     *  Metodo que realiza el registro de un usuario en la tabla
     * @param user Objeto con los datos de usuario
     * @returns Peticion hacia la url que ejecuta el metodo del backend que 
     * guarda el registro en la tabla de la DB
     */
    register(user): Observable<any>
    {
        console.log('Entro en register observable');
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register', params, {headers: headers});
    }

    /**
     *  Metodo de login que devuelve el usuario codificado en array
     * @param user 
     * @param gettoken 
     * @returns Usuario decodficado
     */
    signup(user, gettoken = false): Observable<any>{
        if(gettoken != false){
            user.gettoken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'login', params, {headers:headers});
    }

    /**
     *  Metodo de login que devuelve el usuario decoificado en objeto
     * @param user 
     * @param gettoken 
     * @returns Usuario decodficado
     */
    signupobject(user, gettoken): Observable<any>{
        if(gettoken != false){
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'login', params, {headers:headers});
    }

    /**
     *  Metodo que saca los datos del usuario logueado decodificados
     * y los guarada en un objeot identity.
     * @returns Object objeto del usuario identificado 
     */
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity') || '{}' );

      if(identity && identity != "undefined")
      {
          this.identity = identity;
      }
       else
      {
          this.identity = null;
      } 

      return this.identity;
    }

    /**
     * Metodo que saca el token codificado del usuario logueado 
     * y los guarada en un objeot token.
     * @returns 
     */
    getToken(){
        let token = localStorage.getItem('token');

        if(token && token != "undefined"){
            this.token = token;
        }
        else{
            this.token = null;
        }

        return this.token;
    }

    /**
     *    Metodo que permite la actualizacion del registro del usuario
     * @param token 
     * @param user 
     * @returns La url del backend que ejecuta el metodo de actualizacion,
     * pasandole los parametros de los datos y las cabeceras.
     */
    update(token, user): Observable <any> {
        // POR AÑADIR user.description = global.htmlEntities(user.description);

        let json = JSON.stringify(user);
        let params = "json="+json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.put(this.url + 'user/update', params, {headers: headers});
    }
    
    /**
     *    Metodo que recupera los datos del usuario con id que recibe parametro, que es cualquier
     * usuario, no el que esta logueado. Sirve para que un usuario con role_id=2 (que es Empleador)
     * pueda ver los curriculos de los usuarios con role_id=3 (Demandante) que se han suscrito a la 
     * oferta de trabajo.
     * @param token Sirve para identificar al usuario logueado en la API.
     * @param id Entero que sirve para identificar al usuario cuyos datos se quieren recuperar.
     * @returns Un JSON con un indice 'user' que contiene los datos con la informacion del usuario
     * con 'id' pasado por parametro.
     */
    getUserById(token,id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set('Authorization',token);
        
         return this._http.get(this.url + 'user/detail/' +id, {headers: headers});
    }
    
}