import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';

/**
 *   Componente que se encarga de recibir los datos para crear una
 * nueva categoria en la DB, manda los datos a los metodos del
 * backend que realizan la opecacion.
 * @author Marek Kubicki
 * @version 1.0.2
 */
@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit{
    public page_title: string;
    public identity;
    public token;
    public category: Category;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _categoryService: CategoryService
    ){
        this.page_title = "Página de creación nueva entrada";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.category = new Category(1,'');
        this.status = '';
    }

    ngOnInit() {
      throw new Error('Method not implemented.');
    }

    /**
     *   Recibe los datos de la categoria desde el formulario y ejecuta
     * el metodo del servicio de categorias que guarda los datos en la DB.
     * @param form 
     */
    onSubmit(form){
      this._categoryService.create(this.token, this.category).subscribe({
        next: (response) =>{               
                if (response.status = 'success')
                {
                    this.category = response.category;                     
                    this.status = 'success';                   

                    this._router.navigate(['/inicio']);
                }
                else
                {
                    this.status = 'error';
                }
          },
        error: (error) => {
           this.status= 'error';
           console.log('Error enviando datos', error); 
        },
        complete: () => console.info('complete') 
    });
    }
}

