import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../../models/JobOffer';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../services/global';
import { UrlSegment } from '@angular/router';

/**
 *    Componente que muestra todas las ofertas de trabajo vacantes,
 * asi como los botones de accion por cada oferta de trabajo.
 * @author Marek Kubicki
 * @version 1.1.3
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ JobOfferService, UserService ]
})
export class HomeComponent implements OnInit{

  public page_title: string;
  public url: string;
  public status: string;
  public jobOffers: Array<JobOffer>;
  public token;
  public identity;

  constructor(
      private _jobOfferService: JobOfferService,
      private _userService: UserService
  ){
      this.page_title="Componente de Home";
      this.url = global.url;
      this.status = '';
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    this.getJobOffers();
  }

  /**
   *    Metodo que recupera los registros de la tabla
   * JobOffers desde el backend.
   */
  getJobOffers(){
      this._jobOfferService.getJobOffers().subscribe(
        {
          next: (response) =>{               
              if(response.status == 'success'){
                  this.jobOffers = response.jobOffers;
                  console.log(this.jobOffers);
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
