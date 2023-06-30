import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/Category';
import { User } from '../../models/User';
import { JobOffer } from '../../models/JobOffer';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

/**
 *    Componente que muestra los registros: job_offer de la 
 * tabla job_offers filtrados por su campo category_id.
 * @author Marek Kubicki
 * @version 1.0.4
 */
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [ CategoryService, UserService ]
})
export class CategoryDetailComponent implements OnInit{

    public page_title: string;
    public category: Category;
    public jobOffers: Array<JobOffer>;
    public url: string;
    public status: string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _categoryService: CategoryService,
        private _userService: UserService
    ){
        this.page_title = 'Página detalle de categoría';

        this.url = global.url;
        this.status = '';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit(){
        this.getJobOffersByCategory();
    }

    // Metodo que obtiene la categoria seleccionada y los jobOffers
    getJobOffersByCategory(){
        // Obtener id de categoria desde la URL
        this._route.params.subscribe( params =>
          {
              let id = +params['id'];

              // Peticion a servicio para para recuperar el id de la categoria
              // desde la URL
              this._categoryService.getCategory(id).subscribe(
                {
                  next: (response) =>{
                    if(response.status == 'success'){                
                        this.category = response.category;
                        console.log(this.category);
                        
                        console.log('CONSOLE LOG EN SUSCRBIE - next() is= ' + response.status);

                   // Peticion a servicio para para recuperar jobOffers de la categoria
                   // de id recuperado de la URL
                        this._categoryService.getJobOffers(id).subscribe(
                          {
                            next: (response) => {
                                if(response.status = 'success'){
                                    this.jobOffers = response.jobOffers;
                                    console.log('EJECUTADO NEXXT JOBOFFERS => ' + this.jobOffers);
                                }
                                else{
                                  console.log('EJECUTAO SUSCRBIE error 2 DE CLASE category-detail.component');
                                  this.status = 'error';
                                }
                            },
                            error: (error) => {
                              console.log('EJECUTAO SUSCRBIE error 1 DE CLASE category-detail.component');
                              this.status = 'error';
                            },
                            complete: () => console.info('complete')
                          }
                        )
                    }
                    else{
                        this.status = 'error';
                        console.log('CONSOLE LOG EN SUSCRBIE - next() else= ' + response.status);
                        this._router.navigate['inicio'];
                    }
                  },
                  error: (error) => {
                    console.log(error + 'CONSOLE LOG EN SUSCRBIE error');
                    this._router.navigate['inicio'];
                  },
                  complete: () => console.info('complete')
                }
              );
          }   
        )
    }
}
