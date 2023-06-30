import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { CategoryService } from './services/category.service';

/**
 * Clase inicial en la aplicacion. Se muestra la vista Home y una
 * barra de tareas superior con opciones para filtrar las ofertas de 
 * trabajo por ciudades y un menu desplegable para iniciar sesion.
 *    Si el usuario esta logueado el menu desplegable le muestra diferentes
 * opciones segun el rol del usuario.
 * @author Marek Kubicki
 * @version 1.4.1
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck{
    public title = 'frontend-angular';
    public identity;
    public token;
    public url;
    public status;
    public categories;
  
    constructor(
      private _userService: UserService,
      private _categoryService: CategoryService
      
    ){
      this.loadUser();
      this.url = global.url;
      this.status = '';
    }

    ngOnInit(){
        console.log('Pagina incial de web cargada');
        this.getCategories();
    }

    ngDoCheck(){
        this.loadUser();
        
    }

    /**
     * Metodo que crea las variables identity y token para
     * identificar al usuario en la aplicacion, e iniciar
     * la sesion del usuario.
     */
    loadUser(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }

  /**
   * Metodo que carga las categorias y las devuelve
   */
  getCategories(){                                                                   
    this._categoryService.getCategories().subscribe({                                 
      next: (response) => { 
          if(response.status = "success"){                                         
              this.categories = response.categories;                                
              console.log(this.categories);                                          
          }
      },
      error: (error) => {
          console.log(error);
      },
      complete: () => console.info('complete')
    });
  }
}