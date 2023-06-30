import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JobOffer } from '../../models/JobOffer';
import { JobOfferService } from '../../services/job-offer.service';
import { UserService } from '../../services/user.service';
import { ApplicantService } from '../../services/applicant.service';
import { applicant } from 'src/app/models/Applicant';
import { global } from '../../services/global';


/**
 *    Componente que muestra los datos del  registro de la 
 * tabla job_offers consultado.
 * @author Marek Kubicki
 * @version 1.4.5
 */
@Component({
  selector: 'app-job-offer-detail',
  templateUrl: './job-offer-detail.component.html',
  styleUrls: ['./job-offer-detail.component.css'],
  providers: [ JobOfferService, UserService, ApplicantService]
})
export class JobOfferDetailComponent implements OnInit{

  public page_title: string;
  public url: string;
  public jobOffer: JobOffer;
  public status: string;
  public token;
  public identity;
  public applicant: applicant;

  // Creo dos variables numricas para recibir los ids  de jobOffer y Userç
  public jobOffer_id: number;
  public user_id: number;

  public yaApuntadoAjoboffer: boolean;

  constructor(
      private _jobOfferService: JobOfferService,
      private _userService: UserService,
      public _applicantService: ApplicantService,
      private _route: ActivatedRoute,
      private _router: Router     
  ){
      this.page_title="detalles de la oferta de trabajo:";
      this.url = global.url;
      this.status = '';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.yaApuntadoAjoboffer = false;

  }

  ngOnInit(){
      this.getJobOffer();
      this.checkIfApplicantRowExists();
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
                  

// *************                  this.checkIfApplicantRowExists();

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
   * Metodo para recargar la vista
   */
  refresh(): void {
     window.location.reload(); 
    }


  /**
   *   Metodo evento click del botón APUNTARSE, que al clicar
   * agrega el user_id y el jobOffer_id a la tabla applicants
   * como un nuevo registro.
   */
  clickApuntarse(){

    console.log(this._applicantService.test());    

  // Asigno  jobOffer.id a una variable para pasarla luego a create() de servicio
        this.jobOffer_id =  this.jobOffer.id;
        this.user_id = this.identity.sub;

    //  Obtener ID de oferta a partir de parametro de URL
    this._route.params.subscribe(params=>{
      let id = +params['id'];
      console.log('PARAMETRO ID DE OFERTA TRABAJO DE URL = ' + id);

      //   A este metodo ser servicio applicantService se le pasa por parametro:
      // - el token, para poder autenticar al usuario
      // - el objeto jobOffer con todos los datos de la jobOffer = oferta de trabajo
      // - el id de la jobOffer, que se recupera del parametro de la URL
      this._applicantService.create(this.token, this.jobOffer , id).subscribe(
    
        {
          next: (response) =>{
            if(response.status == 'success'){                
                this.jobOffer = response.jobOffer;
                this.refresh();
            }
            else{
                this.status = 'error';
                this._router.navigate['inicio'];
            }
          },
          error: (error) => {
            console.log(error);
         //   this._router.navigate['inicio'];
          },
          complete: () => console.info('complete')
        }
      );
    })
  }
  
  /**
   *  Ejecuta el metodo del servicio de job-offer.service que realiza la peticion
   * al backend, para que actualice el campo status_id a 1 de la tabla job_offers.
   */
  updateStatusToOne() {

    this.jobOffer_id = this.jobOffer.id;


    //  Obtener ID de oferta a partir de parametro de URL
    this._route.params.subscribe(params => {
      let id = +params['id'];
      console.log('PARAMETRO ID DE OFERTA TRABAJO DE URL = ' + id);
      this._jobOfferService.updateJobOfferStatusChangeToOne(this.token, id).subscribe(

        {
          next: (response) => {
            if (response.status == 'success') {
              this.jobOffer = response.jobOffer;
              console.log('CONSOLE LOG EN SUSCRBIE= ' + this.jobOffer.id);
            }
            else {
              this.status = 'error';
              this._router.navigate['inicio'];
            }
          },
          error: (error) => {
            console.log(error);
            //   this._router.navigate['inicio'];
          },
          complete: () => console.info('complete')
        }
      );
    })
  }

  /**
   *  Ejecuta el metodo del servicio de job-offer.service que realiza la peticion
   * al backend, para que actualice el campo status_id a 2 de la tabla job_offers.
   */
  updateStatusToTwo() {

    this.jobOffer_id = this.jobOffer.id;


    //  Obtener ID de oferta a partir de parametro de URL
    this._route.params.subscribe(params => {
      let id = +params['id'];
      console.log('PARAMETRO ID DE OFERTA TRABAJO DE URL = ' + id);
      this._jobOfferService.updateJobOfferStatusChangeToTwo(this.token, id).subscribe(

        {
          next: (response) => {
            if (response.status == 'success') {
              this.jobOffer = response.jobOffer;
              console.log('CONSOLE LOG EN SUSCRBIE= ' + this.jobOffer.id);
            }
            else {
              this.status = 'error';
              this._router.navigate['inicio'];
            }
          },
          error: (error) => {
            console.log(error);
            //   this._router.navigate['inicio'];
          },
          complete: () => console.info('complete')
        }
      );
    })
  }
  
  /**
   *    Metodo que comprueba si existe el registro en la tabla applicants,
   * buscando por los valores de los campos: user_id y jobOffer_id.
   *    Recupera valor de user_id del objeto identity de Local Storage
   *    Recupera valor de jobOffer_id de URL
   */
  checkIfApplicantRowExists(){

    this._route.params.subscribe(params => {

      let joboffer_id = +params['id'];      // el 1º parametro que se pasa  por URL es 'id'

        this._applicantService.getApplicantByUserIdAndJobOfferId(this.token, joboffer_id, this.identity.sub).subscribe(
            {
                 next: (response)=> {
                  if (response.status == 'success') {
                  
                    console.log('CONSOLE LOG EN SUSCRBIE DE METODO= checkIfApplicantRowExists => VALORES: joboffer_id => ' 
                      + joboffer_id + ' -- this.identity.sub => ' + this.identity.sub);
                      this.yaApuntadoAjoboffer = true;
                  }
                  else {
                    this.status = 'error';
                    this._router.navigate['inicio'];
                  }

                 },
                 error: (error) => {
                  console.log(error);
                  //   this._router.navigate['inicio'];
                },
                complete: () => console.info('complete')
            }
        );
    })
  }

}
