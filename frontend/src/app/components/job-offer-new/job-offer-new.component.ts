import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { JobOffer } from '../../models/JobOffer';
import { global } from '../../services/global';

/**
 *   Componente que se encarga de recibir los datos para crear una
 * nuevo registro de oferta de trarbajo en la DB: tabla JobOffers, 
 * manda los datos a los metodos del backend que realizan la opecacion.
 * @author Marek Kubicki
 * @version 1.3.1
 */
@Component({
  selector: 'app-job-offer-new',
  templateUrl: './job-offer-new.component.html',
  styleUrls: ['./job-offer-new.component.css'],
  providers: [UserService, CategoryService, JobOfferService ]
})
export class JobOfferNewComponent implements OnInit{

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
      this.page_title = 'Pagina craer nueva oferta';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = global.url;
      this.status = '';
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
      attachPinBtn: 'Sube la imagen para la oferta de trabajo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
}; 

  ngOnInit() {
    this.getCategories();
    this.jobOffer = new JobOffer(1, this.identity.sub, 1, '', '', '', 1, 1, 0, null);     
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

      this._jobOfferService.create(this.token, this.jobOffer).subscribe(
        {
          next: (response) =>{
            if(response.status == 'success'){
                this.jobOffer = response.jobOffer;
                this.status = 'success';
                console.log(this.jobOffer.content);
                this._router.navigate(['/inicio']);
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
   * @param datos Recibe los bytes para guardar la imagen
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

}
