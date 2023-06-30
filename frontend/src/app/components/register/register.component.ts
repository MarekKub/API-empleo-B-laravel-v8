import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

/**
 *   Componente que se encarga de recibir los datos para crear un
 * nuevo registro de usuario en la DB: tabla users, manda los datos 
 * a los metodos del backend que realizan la opecacion.
 * @author Marek Kubicki
 * @version 1.0.3
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(
      private _userService: UserService
  ){
      this.page_title = "Regístrate";
      this.user = new User(1,'','', 1 ,'','','','','');
      this.status = '';
  }

  ngOnInit()
  {
      console.log("Componente de registro");
      console.log(this._userService.test());
  }

  /**   Recibe los datos del usuario necesarios para registrar al 
   * usuario y los manda al metodo del backend que guarda el registro
   * en la DB: tabla users.
   * @param form 
   */
  onSubmit(form)
  {
    
    this._userService.register(this.user).subscribe({
      next: (response) =>{
        //  console.log('Current response', response);              
        if(response.status == "success"){
        
          this.status = response.status;

          form.reset();
          
          console.log(this.user);
          console.log(response);
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
}