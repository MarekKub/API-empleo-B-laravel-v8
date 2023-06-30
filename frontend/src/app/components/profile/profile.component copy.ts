/*
    COPIA DE SEGURIDAD : ÚLTIMO HECHO EL SUSCRIBE Y next, error PROBADOS Y
FUNCIONANADO


import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { JobOffer } from '../../models/JobOffer';
import { UserService } from '../../services/user.service';
import { JobOfferService } from '../../services/job-offer.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ UserService, JobOfferService]
})
export class ProfileComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public url;
    public jobOffers: Array<JobOffer>;



    constructor(
        private _userService: UserService,
        private _jobOfferService: JobOfferService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.page_title = 'Mi perfil de usuario:';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = global.url;
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

                this._jobOfferService.getJobOffersByUser(this.token, id).subscribe(
                    {
                        next: (response) =>{
                            console.log('EJECUTAO SUSCRBIE next DE getJobOffersByUsr() DE CLASE profile.component');
                        },
                        error: (error) => {
                            console.log('EJECUTAO SUSCRBIE error DE getJobOffersByUsr() DE CLASE profile.component');

                        },
                        complete: () =>  console.info('complete')
                    }
                )
            }
        );
    }
}
*/