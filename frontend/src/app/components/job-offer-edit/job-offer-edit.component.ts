import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { JobOffer } from '../../models/JobOffer';
import { global } from '../../services/global';

/**
 *   Componente que se encarga de recibir los datos para actualizar 
 * el registro de job_offer en la DB: tabla job_offers, manda los datos 
 * a los metodos del backend que realizan la opecacion.
 * @author Marek Kubicki
 * @version 1.6.2
 */
@Component({
  selector: 'app-job-offer-edit',
  templateUrl: './job-offer-edit.component.html',
  styleUrls: ['./job-offer-edit.component.css'],
  providers: [UserService, CategoryService, JobOfferService ]
})
export class JobOfferEditComponent implements OnInit{

  public page_title: string;
  public identity;
  public token;
  public jobOffer: JobOffer;
  public categories;
  public url;
  public status: string;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _categoryService: CategoryService,
      private _jobOfferService: JobOfferService
  ){
      this.page_title = 'Pagina editar datos de oferta';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = global.url;
      this.status = '';
      this.jobOffer = new JobOffer(1, 1, 1, '', '', '', 1, 1, 0 , null);
  }

  // Opciones editor texto enriquerico
  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],     
  }

  // Configuracion de campo angular-file-uploader para subir la imagen de la oferta de trabajo
  public afuConfigImg = <any>{
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:  'http://localhost/API-empleo-B-laravel-v8/backend/public/api/joboffer/upload',
      method:"POST",
      headers: {
          "Authorization" : this._userService.getToken(),
      },
      responseType: 'json',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccionar archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la imagen para la oferta',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
}; 

  ngOnInit() {
    this.getCategories();
    this.jobOffer = new JobOffer(1, this.identity.sub, 1, '', '', '', 1, 1, 0, null);     
    this.getJobOffer();
  }

  /**
     *   Recibe los datos de la oferta de trabajo (jobOffer) desde el 
     * formulario y ejecuta el metodo del servicio de job-offer que guarda
     * los datos en la DB.
     * @param form 
     */
  onSubmit(form){
      console.log(this.jobOffer);
      console.log(this._jobOfferService.test());      

      this._jobOfferService.update(this.token, this.jobOffer, this.jobOffer.id).subscribe(
        {
          next: (response) =>{
            if(response.status == 'success'){
                this.jobOffer = response.jobOffer;
            console.log('SUSBCRIBE DE ONSBUMIT NEXT()');
                this.status = 'success';
               this._router.navigate(['/job-offer-detail', this.jobOffer.id]);
            }
            else{
                this.status = 'error';
            }
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => console.info('complete')
        }
      );
  }

  /**
   *   Recibe los datos de la imagen representativa de la oferta de trabajo
   * desde el formulario y los asigna al objeto jobOffer.
   * @param datos 
   */
  imageUpload(datos){
    console.log('CONSOLE LOG  DE IMAGEUPLOAD ' +datos.body.image);
    let data_image = datos.body.image;                  
    this.jobOffer.image = data_image;
  };

  /**
   *   Recupera las categorias.
   */
  getCategories(){
    this._categoryService.getCategories().subscribe({
      next: (response) =>{
          if(response.status == 'success'){
              this.categories = response.categories;
          }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('complete')   
    });    
  }

  /**
   *  Recupera los datos de una oferta de trabajo en concreto, la 
   * del parametro id que se pasa por la URL
   */
  getJobOffer(){
      // Obtener el paramtro id del jobOffer pasado por URL
      this._route.params.subscribe(params=>{
          let id = +params['id'];

          console.log(id);
          console.log(this.jobOffer);


          // Obtener los datos del registor jobOffer del id recuperado de la URL
          this._jobOfferService.getJobOffer(id).subscribe(
            {
              next: (response) =>{
                if(response.status == 'success'){
                    this.jobOffer = response.jobOffer;
                    console.log('CONSOLE LOG EN SUSCRBIE jobOffer_id= ' + this.jobOffer.id);
                    console.log('ONJEOT JOBOFFER INDICE user_id => ' + this.jobOffer.user_id);
                    console.log('ONJEOT identity INDICE sub => ' + this.identity.sub);
                }
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => console.info('complete') 
            }
          );
      }
      );
  }

}
