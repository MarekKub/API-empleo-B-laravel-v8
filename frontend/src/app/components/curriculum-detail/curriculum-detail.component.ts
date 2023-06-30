import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { applicant } from '../../models/Applicant';
import { UserService } from '../../services/user.service';
import { ApplicantService } from '../../services/applicant.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';

/**
 *    Componente que muestra el pdf del campo curriculo de la tabla users
 * para el registro consultado.
 * @author Marek Kubicki
 * @version 1.0.8
 */
@Component({
  selector: 'app-curriculum-detail',
  templateUrl: './curriculum-detail.component.html',
  styleUrls: ['./curriculum-detail.component.css'],
  providers: [UserService, ApplicantService]
})
export class CurriculumDetailComponent {
    public page_title: string;
    public token;
    public identity;
    public url: string;
    public applicant: applicant;
    public status: string;
    public user: User;
    public jobOffer_id:number;

    constructor(
        private _userService: UserService,
        private _applicantService: ApplicantService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.page_title = "Pagina curriculum detail";

        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.url = global.url;
        this.status = '';
    }

    ngOnInit(){
        this.getUserCurriculum();
    }

    getUserCurriculum(){
      // Recupera el id de la URL, que es el ID del user seleccionado.
      this._route.params.subscribe(params =>{
          //  Recupera el valor del paramtro 'id' de la URL, este es el nombre que 
          //le he dado al parametro en app.routing.app 
          let id = +params['id'];   
          //  Recupera el valor del paramtro 'jobOffer_id' de la URL, este es el nombre que 
          //le he dado al parametro en app.routing.app   
           this.jobOffer_id = +params['jobOffer_id'];

           console.log('VALOR PARAMETRO POR URL jobOffer_id, EL NOMBRE DE LOS PARAMTREOS SE DEFINE EN app.routing.ts AL CREAR LA RUTA EN EL ARRAY appRoutes =>' + this.jobOffer_id);
        
           //   METODO QUE EJECUTA EL METODO detail DEL BACKEND A TRAVÉES DEL METODO EN EL SERVICIO
           this._userService.getUserById(this.token, id).subscribe(
            {
                next: (response) =>{             
                    this.user = response.user;
                      
                      console.log('CONSOLE LOG EN SUSCRBIE DE CURRICULUM-DETAIL= ' +  this.user);
 
                },
                error: (error) => {
                  console.log(error);
                  this._router.navigate['inicio'];
                },
                complete: () => console.info('complete')
                
              });

  // ESTO ES   PARA RECUPERAR EL ID DE JOBOFFER_ID PARA PODER VOLVER A LA OFERTA DE TRABAJO
  //  PERO FALLA QUE NO VUELVE A LA OFERTA DE LA QUE VIENE, SI NO EL PRIMER REGISRO QUE 
  // ENCUETRA EN TABLA DONDE COINCIDE EL USER_ID
  //
              //******** NEUVO 1 RECUPERAR REGISTRO DE TABAL applicants CON ID DE USER
             //  CAMBIO EL METOO QUE LLAMO   this._applicantService.getApplicantByUserId(this.token, id).subscribe(
                 this._applicantService.getApplicantByUserIdApplicant(this.token, id).subscribe(
                  {
                    next: (response) =>{

                             this.applicant = response.applicant;
                             console.log('DENTRO DE LIESTNEETT applicantService  next=  VALOR DEL response.applicant ' +
                             ' DE OBJETO APPLICANT RECUPERADO => ' + this.applicant);
       
                       },
                       error: (error) => {
                         console.log('DENTRO DE LIESTNEETT applicantService error= ' + error);
                    //     this._router.navigate['inicio'];
                       },
                       complete: () => console.info('complete')

                });
          }   
      );     
    }  // fin getUserCurricul

}
