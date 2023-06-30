import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

/**
 *   Componente que se encarga de recibir los datos para actualizar 
 * el registro de usuario en la DB: tabla users, manda los datos 
 * a los metodos del backend que realizan la opecacion.
 * @author Marek Kubicki
 * @version 1.5.3
 */
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit{
    public page_title: string;
    public user: User;
    public identity;
    public token;
    public status;
    public url;

    constructor(
      private _userService: UserService
    ){
        this.page_title = 'Ajustes de usuario';
        this.user = new User(1,'','', 1 ,'','','','','');
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.status = '';
        this.url = global.url;

        this.user = new User(
          this.identity.sub,
          this.identity.name,
          this.identity.surname,
          this.identity.role_id,
          this.identity.email,
          '',
          this.identity.description,
          this.identity.image,
          this.identity.curriculo);       

        
    }

    // Opciones editor texto enriquerico
    public froala_options: Object = {
      charCounterCount: true,
      language: 'es',
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],     
    };   
    
    // Configuracion de campo angular-file-uploader para subir la imagen de usuario
    public afuConfigImg = <any>{
      multiple: false,
      formatsAllowed: ".jpg,.png, .gif, .jpeg",
      maxSize: "50",
      uploadAPI:  {
        url:  'http://localhost/API-empleo-B-laravel-v8/backend/public/api/user/uploadImage',
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
        attachPinBtn: 'Sube tu imagen de usuario',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
  }; 

  // Configuracion de campo angular-file-uploader para subir el curriculo
  public afuConfigPdf = <any>{
    multiple: false,
    formatsAllowed: ".pdf",
    maxSize: "50",
    uploadAPI:  {
      url: global.url + 'user/uploadPdf',
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
      attachPinBtn: 'Sube tu currículo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
}; 

   

    ngOnInit(){
        console.log('Componente user-edit iniciado');
    }

    /**
     *    Componente que se encarga de recibir los datos del formulario
     * para actualizar el registro de usuario en la DB: tabla users, manda
     * los datos a los metodos del backend que realizan la opecacion.
     * @param form 
     */
    onSubmit(form){
        this._userService.update(this.token, this.user).subscribe({
          next: (response) =>{
          
            if(response.status == "success"){
              console.log(response);
                this.status = 'success';
              
                // Modificar usuario en funcion de cambios
              if(response.changes.name){
                  this.user.name = response.changes.name;
              }
              if(response.changes.surname){
                this.user.surname = response.changes.surname;
              }
              if(response.changes.email){
                this.user.email = response.changes.email;
              }
              if(response.changes.description){
                this.user.description = response.changes.description;
              }
              if(response.changes.image){
                this.user.image = response.changes.image;
              }
              if(response.changes.curriculo){
                this.user.curriculo = response.changes.curriculo;
              }

              // Actualizar usuario en sesion
              this.identity = this.user;
                localStorage.setItem('identity',JSON.stringify(this.identity));
                console.log('USER-EDIT UPDATE NEXT : => ' +this.identity);
            }
            else {
              
              this.status = 'error';
              
              console.log(<any>Error);
            }
    
          },
          
          error: (error) => {
         
            this.status = 'error';
           
            console.log('Error enviando datos', error);   
          },
          complete: () => console.info('complete') 
        });
    }

  /**
   *   Recibe los datos de la imagen representativa de la imagen del usuario
   * desde el formulario y los asigna al objeto user.
   * @param datos REcibe los bytes para guardar la imagen
   */
    imageUpload(datos){
        console.log('CONSOLE LOG  DE IMAGEUPLOAD ' +datos.body.image);
        let data_image = datos.body.image;                  
        this.user.image = data_image;
    };

  /**
   *   Recibe los datos de la imagen representativa del curriculum del usuario
   * desde el formulario y los asigna al objeto user.
   * @param datos Recibe los bytes para guardar el PDF
   */
    pdfUpload(datos){
        console.log('CONSOLE LOG  DE PDFUPLOAD ' + datos.body.image);
        let data_pdf = datos.body.image;                  
       this.user.curriculo = data_pdf;
    };
}
