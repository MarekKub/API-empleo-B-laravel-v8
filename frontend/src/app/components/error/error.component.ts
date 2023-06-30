import { Component } from '@angular/core';

/**
 * Componente que se ejecuta cuando la URL buscada no existe.
 * @author Marek Kubicki
 * @version 1.0.0
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
    
    public page_title: string;

    constructor(){
      this.page_title = 'Página no encontrada';
    }

}
