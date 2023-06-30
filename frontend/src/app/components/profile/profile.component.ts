import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { JobOffer } from '../../models/JobOffer';
import { applicant } from '../../models/Applicant';
import { UserService } from '../../services/user.service';
import { JobOfferService } from '../../services/job-offer.service';
import { ApplicantService } from '../../services/applicant.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

/**
 *    Componente que muestra todas las ofertas de trabajo a las que
 * se ha suscrito el usuario.
 *   Asi como los botones de accion o en su defecto el estado de la 
 * oferta si esta ha sido 'CUBIERTA' o 'DADA DE BAJA' por cada oferta
 * de trabajo.
 * @author Marek Kubicki
 * @version 1.1.6
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ UserService, JobOfferService, ApplicantService]
})
export class ProfileComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public url;
    public jobOffers: Array<JobOffer>;
    public applicants: Array<applicant>;
    public status: string;


    constructor(
        private _userService: UserService,
        private _jobOfferService: JobOfferService,
        private _applicantService: ApplicantService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.page_title = 'Ofertas suscritas de usuario:';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = global.url;
        this.status = '';
    }

    
    ngOnInit(){
        this.getJobOffersByUser();
    }


    //  El id del usuario me llega por la URL
    
    getJobOffersByUser(){
        // Recibir el id del usuario de la url
        this._route.params.subscribe( params => 
            {
               
                let id = +params['id'];

                // Evalua role_id de la variable identity de Local Storage 
                if(this.identity.role_id == 2){
                    console.log('EJEUCTADO IF EN profile.component SI role_id= 2');

                    this._jobOfferService.getJobOffersByUser(this.token, id).subscribe(
                        {
                            next: (response) =>{
                                console.log('EJECUTAO SUSCRBIE next DE getJobOffersByUsr() DE CLASE profile.component');

                                //    Metodo de servicio job-offer.service que recupera las ofertas de tabla job_offers
                                // creadas por el user
                                this.status = 'success';
                                this.jobOffers = response.jobOffers;
                                console.log('OBJETO this.jobOffers DE SUSCRIBE -> NEXT() DE  MÉTODO  getJobOffersByUser(this.token, id) ===> ' 
                                        + this.jobOffers);
                          
                            },
                            error: (error) => {
                                console.log('EJECUTAO SUSCRBIE error DE getJobOffersByUsr() DE CLASE profile.component');
                                this.status = 'error';
                            },
                            complete: () =>  console.info('complete')
                        }
                    )
                }
                if(this.identity.role_id == 3){
                    console.log('EJEUCTADO IF EN profile.component SI role_id= 3');
                     
                    
                    this._applicantService.getAllApplicantsObjectsByUserId(this.token, id).subscribe(
                        {
                            next:(response) =>{
                                this.status = 'success';
                                console.log('CLASE PROFILE.COMPONENT, METOO getJobOffersByUser - '
                                    + 'IF SI EL role_id TIENE VALOR = 3');
                                this.applicants = response.applicants;
                                console.log(this.applicants);

                                //    Metodo de servicio job-offer.service que recupera las ofertas de tabla job_offers
                                // creadas por el user
                               
                            },
                            error: (error) => {
                                console.log('EJECUTAO SUSCRBIE error DE getJobOffersByUsr() DE CLASE profile.component');
                                this.status = 'error';
                            },
                            complete: () =>  console.info('complete')
                        }
                    )
                }

            }
        );
    }
}
