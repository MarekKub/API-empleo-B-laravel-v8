<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    // Metodo para hacer pruebas
        public function pruebas(Request $request){                            //    Le pasamos objeto Request para poder recibir peticiones,  recoger datos qeu enviemos desde un formulario,  ni peticiones qeu hagamos con POSTMAN.
        return "Acción de pruebas desde USER-CONTROLLER";
    }

    // Metodo para el registro de usuario
    public function register(Request $request){

        // Recoger los datos desde formulario
            // Recoger datos de variables
            $json = $request->input('json', null);
        
        // Decodificar los datos
        $params = json_decode($json);   // obtiene objeto

        var_dump($params); 
        die();

        /*
        $params_array = json_decode($json,true);  // obtiene array
        */
                
        // Validar datos
      /*
        $validate = \Validator::make($params_array,[
            'name'      =>  'required|alpha',
            'surname'   =>  'required|alpha',
            'email'     =>  'required|email',
            'password'  =>  'required'
        ]);
        */
    

        // Cifrar contraseña

        // Comprobar si usuario existe (duplicado)

        // Crear el usuario

        
        //  Array para devolver en JSON
        $data = array(
            'status'    => 'error',
            'code'      => 404,
            'message'   => 'El usuario no se ha creado'
        );

        return response()->json($data,$data['code']);
    }

    // Metodo para el login de usuario
    public function login(Request $request){
        return "Acción de login";
    }
}
?>
