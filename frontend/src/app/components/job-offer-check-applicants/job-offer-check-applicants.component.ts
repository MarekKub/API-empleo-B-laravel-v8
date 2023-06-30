import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JobOffer } from '../../models/JobOffer';
import { JobOfferService } from '../../services/job-offer.service';
import { UserService } from '../../services/user.service';
import { applicant } from '../../models/Applicant';
import { ApplicantService } from '../../services/applicant.service';
import { global } from '../../services/global';

/**
 *    Componente que muestra todas los registros de la tabla 'applicants'
 * que estan apuntados a una oferta de trabajo en concreto.
 * @author Marek Kubicki
 * @version 1.3.7
 */
@Component({
  selector: 'app-job-offer-check-applicants',
  templateUrl: './job-offer-check-applicants.component.html',
  styleUrls: ['./job-offer-check-applicants.component.css'],
  providers: [JobOfferService, UserService, ApplicantService]
})
export class JobOfferCheckApplicantsComponent implements OnInit{

  public page_title: string;
  public identity;
  public token;
  public url;
  public jobOffer: JobOffer;
  public status: string;
  public applicants: Array <applicant>;

  constructor(
      private _jobOfferService: JobOfferService,
      private _userService: UserService,
      private _applicantService: ApplicantService,
      private _router: Router,
      private _route: ActivatedRoute 
  ){
      this.page_title="Lista de demandantes apuntados a la oferta:"
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = global.url;
      this.status = '';
  }

  ngOnInit() {
    this.getJobOffer();
 //   this.getApplicants();
   this.getApplicantsByJobOffer();
  }


  /**
   *   Metodo que primero: recupero el id de la oferta que se pasa
   * por parametro por la URL.
   *   A continuacion ejecuta el metodo getJobOffer(id) del servicio
   * para recuperar los datos del registro concreto de la jobOffer,
   * para guardarlos en un objeto y poder mostrarlos en la vista.
   */
  getJobOffer(){
    this._route.params.subscribe(params =>{
         let id = +params['id'];

         this._jobOfferService.getJobOffer(id).subscribe({
           next: (response) =>{
             if(response.status == 'success'){                
                 this.jobOffer = response.jobOffer;
                 
                 console.log('CONSOLE LOG EN SUSCRBIE= ' + this.jobOffer.id);
             }
             else{
                 this.status = 'error';
                 this._router.navigate['inicio'];
             }
           },
           error: (error) => {
             console.log(error);
             this._router.navigate['inicio'];
           },
           complete: () => console.info('complete')
         });
    });
  }

  /**
   *    Metodo que recupera de la DB los registros de todos los usuarios
   * suscritos a la oferta de trabajo en particular.
   */
  getApplicantsByJobOffer(){

    this._route.params.subscribe(params =>{
      let id = +params['id'];
  
      console.log('ID OFERTA TRABAJO RECUPERADO = ' +id);
  
      this._applicantService.getApplicantsByJobOffer(this.token, id).subscribe(
      {
        next: (response) =>{
            if(response.status == 'success'){
                this.applicants = response.applicants;
                console.log(this.applicants);
            }
            else{
                this.status = 'error';
            }
         },
        error: (error) => {
            this.status = 'error';
        },
        complete: () => console.info('complete')
      } 
    );
  });
}


  //  Metodo que recupera todos registros de tabla applicants.
  getApplicants(){
    this._applicantService.getApplicants().subscribe(
      {
        next: (response) =>{               
            if(response.status == 'success'){
                this.applicants = response.applicants;
                console.log(this.applicants);
            }
            else{
                this.status = 'error';
            }
        },
        error: (error) => {
           this.status = 'error';
        },
        complete: () => console.info('complete')
        }    
    );
  }


  
}
