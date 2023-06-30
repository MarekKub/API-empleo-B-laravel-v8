<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Repaso2Controller extends Controller
{
    //  REPASO B) 4  Crear metodo/accion en controlador 
    public function ini(){

        //  REPASO B) 5 Variables locales de metodo
        $texto3="Texto 1 desde metodo en controlador";
        $texto4="Texto 2 desde metodo en controlador";

        //   REPASO B)  6 Metodo return para mandar los datos da vista,
        // mediante un array.
        return view('PruebaControladorUser',array(
            'texto_A' => $texto3,
            'texto_B' => $texto4
        ));

        //   REPASO B)  7 Voy a vista y recibo los datos
    }
}
