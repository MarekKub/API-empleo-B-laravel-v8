import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

/**
 *  Componente que permite iniciar sesion a un usuario, y le
 * asigna un token y identity para mantenerlo identificado 
 * en la navegacion en la pagina.
 * @author Marek Kubicki
 * @version 1.2.1
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
    public page_title: string;
    public user: User;
    public status: string;
    public token;
    public identity;


    constructor(
        public _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute
    ){
        this.page_title = "Pagina de login";
        this.user = new User(1,'','', 1 ,'','','','','');
        this.status = '';
    }


    ngOnInit(){
        console.log("Componente login iniciado");

        this.logout();
    }

    /**
     *  Recibe los datos del usuario necesarios para identificarle,
     * y le asigna un token y identity para mantenerlo identificado
     * en la navegacion en la pagina.
     * @param form 
     */
    onSubmit(form){
   
        this._userService.signup(this.user).subscribe({
         next: (response) =>{      
          
           if(response.status != 'error')
           {
             this.status = 'success';
             this.token = response;

             // Devolver objeto de usuario identificado
             this._userService.signupobject(this.user, true).subscribe({
               next: (response) =>{           
                           
                 this.identity = response;
   
                 console.log(this.token);
                 console.log(this.identity);

                 localStorage.setItem('token', this.token);
                 localStorage.setItem('identity', JSON.stringify(this.identity));

                 this._router.navigate(['inicio']);
               },
               error: (error) => {
                 this.status = 'error';
                 console.log('Error enviando datos', error);   
               },
               complete: () => console.info('complete') 
             });
           } else {
               this.status = 'error';
           }
         },
         error: (error) => {
           this.status = 'error';
           console.log('Error enviando datos', error);   
         },
         complete: () => console.info('complete') 
       });
    }

    /**
     * Metodo que elimina la sesion del usuario identificado
     * en la aplicacion.
     */
    logout(){
      this._route.params.subscribe(params => {
        let logout = +params['sure'];

        if(logout == 1){
            localStorage.removeItem('identity');
            localStorage.removeItem('token');

            this.identity = null;
            this.token = null;

            this._router.navigate(['inicio']);
        }
    });

    }
}
