<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response; 
use App\User;

/**
 * Clase que gestiona las operaciones de CRUD con la tabla de Users en el Backend.
 * @author Marek Kubicki
 * @version 1.8.2
 */
class UserController extends Controller
{
    /**
     * Metodo para hacer pruebas
     */ 
        public function pruebas(Request $request){                        
        return "Acción de pruebas desde USER-CONTROLLER";
    }

    /**
     * Metodo para el registro de usuario. Creo un registro en la tabla
     * Users.
     * @param Request recibe un json con los datos para hacer el registro 
     */
    public function register(Request $request){

        // Recoger los datos desde formulario, el json
            $json = $request->input('json', null);
        
        // Decodificar los datos       
        $params = json_decode($json);   
        $params_array = json_decode($json,true);  
                
        // Limpiar datos
        $params_array = array_map('trim', $params_array);

        // Validar datos
        $validate = \Validator::make($params_array,[
            'name'      =>  'required|alpha',
            'surname'   =>  'required|alpha',
            'email'     =>  'required|email|unique:users',    
            'password'  =>  'required',
            'role_id'   =>  'required|numeric',
        ]);
        
        if(!empty($params) && !empty($params_array))
        {
            // Si falla validacion devuelve array de datos
            if($validate->fails())
            {
                $data = array(
                    'status'    => 'error',
                    'code'      => 404,
                    'message'   => 'El usuario no se ha creado',
                    'errors'    =>  $validate->errors()
                );            
            }
            // Si pasa validacion guarda registro en tabal Users de la DB
            else
            {
               $pwd = hash('sha256', $params->password);

                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->email = $params_array['email'];
                $user->password = $pwd;
                $user->role_id =
                 $params_array['role_id'];
                
                $user->save();

                $data = array(
                    'status'    => 'success',
                    'code'      => 200,
                    'message'   => 'Usuario se ha creado correctamente',
                    'user'      => $user
                );  
            }
        }
        else
        {
            $data = array(
                'status'    => 'error',
                'code'      => 404,
                'message'   => 'Los datos no son correctos'
            );  
        }            

        return response()->json($data,$data['code']);
    }

    /**
     *  Metodo para el login de usuario 
     * @param Request Recibe un json con email y contraseña
     * del usuario.
     * @return token Devuelve un token codificado con los datos del usuario.
     */
    public function login(Request $request){

        $jwtAuth = new \JwtAuth();
       
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        $validate = \Validator::make($params_array,[
            'email'     =>  'required|email',    
            'password'  =>  'required'
        ]);        
    
        if($validate->fails())
        {
            $signup = array(
                'status'    => 'error',
                'code'      => 404,
                'message'   => 'El usuario no se ha podido identificar',
                'errors'    =>  $validate->errors()
            );            
        }
        else
        {
            $pwd = hash('sha256', $params->password);

            //   Devolver token o datos
            $signup = $jwtAuth->signup($params->email, $pwd);
            if(!empty($params->gettoken))
            {
                $signup = $jwtAuth->signup($params->email, $pwd,true);
            }
        }

        return response()->json($signup, 200);
    }

    /**
     *  Metodo para la actualizacion del usuario.
     *  @param Request Recibe un json con los datos a actualizar
     * del usuario.
     * @return token Devuelve un json con los datos del usuario
     * y los cambios realizados.
     */
    public function update(Request $request)
    {
        // Comprobar si el usuario esta identificado
        $token = $request -> header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checkToken = $jwtAuth->checkToken($token);

        $json = $request->input('json',null);
        $params_array = json_decode($json, true);

        if($checkToken && !empty($params_array))
        {          
            // Sacar usuario identificado
            $user = $jwtAuth->checkToken($token, true);            

            $validate = \Validator::make($params_array, [
                'name'      =>  'required|alpha',
                'surname'   =>  'required|alpha',
                'email'     =>  'required|email|unique:users'.$user->sub,
                'description' => 'required',
            ]);

            // Quitar los campos que no quiero actualizar
            unset($params_array['sub']);
            unset($params_array['role_id']);
            unset($params_array['password']);
            unset($params_array['created_at']);
            unset($params_array['remember_token']);

            // Actualizar usuario en DB
            $user_update = User::where('id', $user->sub)->update($params_array);

            $data = array(
                'code'      =>  200,
                'status'    =>  'success',
                'user'   =>  $user,
                'changes'   => $params_array
            );

        }
        else
        {
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message'   =>  'El usuario no está identificado'
            );            
        }

        return response()->json($data, $data['code']);
    }

    /**
     *  Metodo para subir una imagen al servidor.
     * @param Request Fichero con la imange subida
     * @return Json Array de datos
     */
    public function uploadImage   (Request $request)
    {
        // Recoger datos de la peticion, un fichero
        $image = $request->file('file0');

        $validate = \Validator::make($request->all(), [
            'file0'  => 'required|mimes:jpg,jpeg,png'  
        ]);

        if(!$image || $validate->fails())
        {
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message'   =>  'Error al subir la imagen'
            );           
        }
        // Guardar imagen
        else
        {
            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('users')->put($image_name,\File::get($image));

            $data = array(
                'code'  =>  200,
                'status'=>  'success',
                'image' =>  $image_name  
            );
        }
      
        return response()->json($data, $data['code']);
    }

     /**
     *    Metodo que recibe una imagen de la peticion. Y la sube al servidor,
     * al disco. Asociandola con el usuario. Es el pdf con el curriculo del usuario
     * @param Request Recibe un fichero desde la peticion. Solo acepta formato PDF
     * @return json de success o error. En caso de success devuelve el nombre de imagen
     */
    public function uploadPdf(Request $request){

        
        $token = $request -> header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checkToken = $jwtAuth->checkToken($token);
        
        $image = $request->file('file0');

        $validate = \Validator::make($request->all(), [
            'file0'     =>  'required|mimes:pdf'
        ]);

        if(!$image||$validate->fails()){
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message'   =>  'Se produjo error al subir imagen(en UserController@uploadPdf), formato incorrecto. Formatos permitidos: PDF'
            );
        }
        else{           

            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('curriculos')->put($image_name, \File::get($image));

            $data = array(
                'code'      => 200,
                'status'    => 'success',
                'image'     => $image_name
            );
        }             

        return response()->json($data, $data['code'])->header('Content-Type','text/plain');
    }
    
    /**
     * Metodo que devuelve una imagen del servidor
     * @param STring Nombre del fichero
     */
    public function getImage($filename)
    {
        // Comprobar si existe
        $isset = \Storage::disk('users')->exists($filename);

        if($isset)
        {
            // Devolver fichero imagen
            $file = \Storage::disk('users')->get($filename);
            return new Response($file, 200);
        }
        else
        {
            $data = array(
                'code'  =>  404,
                'status'=>  'error',
                'message' =>  'La imagen no existe'
            );
               
          return response()->json($data, $data['code']);
        }
    }

    /**
     *    Metodo que recupera el curriculo en formato PDF del usuario.
     * @param String recibe el nombre del fichero a mostrar
     * @return String si encuentra el fichero, devuelve el nombre del fichero
     */
    public function getPdf($filename){
    
        /* 
         $file = \Storage::disk('users')->get($filename);
         return new Response($file, 200);
         */
 
             // Comprobar si existe
       $isset = \Storage::disk('curriculos')->exists($filename);
 
       if($isset)
       {
           // Devolver fichero imagen
           $file = \Storage::disk('curriculos')->get($filename);
           return new Response($file, 200);
       }
       else
       {
           // Devolver codigo error
           $data = array(
               'code'  =>  404,
               'status'=>  'error',
               'message' =>  'La imagen no existe'
           );
 
            // Devolver el resultado        
         return response()->json($data, $data['code']);
       }
       
     }

    /**
     * Metodo que devuelve los datos de un usuario
     * @param Integer Id de identificacion del usuario
     */
    public function detail($id)
    {
        // Buscar al usuario
        $user = User::find($id);

        if(is_object($user))
        {
            $data = array(
                'code'      =>  200,
                'status'    =>  'success',
                'user'      =>  $user  
            );
        }
        else
        {
            $data = array(
                'code'      =>  404,
                'status'    =>  'error',
                'message'   => 'El usuario no existe'
            );
        }

        return response()->json($data, $data['code']);
    }

}
?>