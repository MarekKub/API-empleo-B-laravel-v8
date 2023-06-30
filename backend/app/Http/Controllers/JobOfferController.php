<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\JobOffer;
use App\Helpers\JwtAuth;

/**
 * Clase que gestiona las operaciones de CRUD con la tabla de job_offers en el Backend.
 * @author Marek Kubicki
 * @version 1.12.4
 */
class JobOfferController extends Controller
{
       //  Constructor que carga el middleware de autenticacion
       public function __construct()
       {      
           $this->middleware('api.auth', ['except' => [
               'index',
               'show',
               'getImage',
               'getJobOffersByCategory',
               'getJobOffersByUser',
               'updateJobOfferStatusChangeToOne',
               'updateJobOfferStatusChangeToTwo'
               ]]);
       }
   
       /**
        * Metodo de prueba
        * @param Request recibe la request
        * @return String devuelve un string de saludo.
        */ 
       public function prueba(Request $request){
       
               return 'Hola desde el controlador de JobOffer, metodo prueba';
       }
   
       
       /**
        *  Metodo que comprueba si el usuario esta registrado, para esto 
        * ejecuta el metodo checkTOken() de la clase Helper JwtAuth.php
        * que deja pasar a la aplicacion (= pues devuevle true en la variable $auth).
        */
       public function getIdentity(Request $request){
           $jwtAuth = new JwtAuth();
           $token = $request->header('Authorization');
           $user = $jwtAuth->checkToken($token, true);
   
           return $user;
       }
   
       /**
        *  Metodo que recupera todos los registros  de la tabla jobs_offer,
        * si sucede algun error o no existen los registros muestra un error.
        * @return Object Devuelve un objeto con los jobs_offers y sus datos
        */
       public function index(){
           $jobOffers = JobOffer::all()->load('category');
   
           if($jobOffers){
               $data = array(
                   'status'    =>  'success',
                   'code'      =>  200,
                   'jobOffers' =>  $jobOffers
               );
           }
           else{
               $data = array(
                   'status'    =>  'error',
                   'code'      =>  400,
                   'message'   =>  'Error en metodo index de JobOffercontroller'  
               );
           }
   
           return response()->json($data,$data['code']);
       }
   
        /**
        *   Metodo que permite el registro de un nueva oferta de empleoo en la DB.
        *   Recibe los datos del formulario, los limpia, los convierte en
        * objeto y array de PHP, los valida, cifra la password, crea el
        * objeto user y lo guarda en la DB: tabla jobs_offers.
        * 
        * @return array $data Devuelve un array de datos que informa si el registro ha sido exitoso o no
        * @param json $json Datos de la oferta de trabajo a registrar
        */
       public function store(Request $request){
           $json = $request->input('json', null);
   
           $params = json_decode($json);        
           $params_array = json_decode($json, true);
   
           if(!empty($params_array)){
               $user = $this->getIdentity($request);
   
               $validate = \Validator::make($params_array, [
                   'title'         =>  'required|alpha',
                   'content'       =>  'required|alpha',
                   'image'         =>  'mimes:jpg, jpeg, png',
                   'salary'        =>  'required|numeric',
                   'type'          =>  'required|alpha',
                   'category_id'   => 'required'
               ]);            
   
               if($validate){
                   $jobOffer = new JobOffer();
   
                   $jobOffer->title    = $params->title;
                   $jobOffer->content  = $params->content;
                   $jobOffer->image    = $params->image;
                   $jobOffer->salary   = $params->salary;
                   $jobOffer->type     = $params->type;
                   $jobOffer->category_id = $params->category_id;
   
                   $jobOffer->user_id  = $user->sub;
   
                   $jobOffer->save();
                 
                    $data = array(
                       'code'      =>  200,
                       'status'    =>  'success',
                        'jobOffer'   =>  $jobOffer
                   );
               }
               else{
                   $data = array(
                       'code'      =>  400,
                       'status'    =>  'error',
                       'message'   =>  'Error al guardar el objeto, en JobOfferController::store'
                   );
               }        
           }    
           else{
               $data = array(
                   'code'  =>  400,
                   'status'    =>  'error',
                   'message'   =>  'Ocurrio error al validar datos, en JobOfferController::store'
               );
           }
   
           return response()->json($data, $data['code']);
       }
   
       /*
           El parametro $id lo recibe por parametro por la URL, es decir, se le pasa
       por parametro por la URL: .../url/2  
       el 2 es el id que recibe
       */
       /**
        *   Metodo que muestra los datos de la oferta de trabajo seleccionada.
        * 
        * @param Integer $id Id de la oferta de trabajo(JobOffer) a mostrar
        * @return array $data Devuelve un array de datos con los datos del
        * registro de la oferta de trabajo, de la tabla JobOffers
        */
       public function show($id){
           $jobOffer = JobOffer::find($id);
   
           if(is_object($jobOffer)){
               $data = array (
                   'code'      =>  200,
                   'status'    =>  'success',
                   'jobOffer'  =>  $jobOffer
               );
           }
           else{
               $data = array (
                   'code'      =>  400,
                   'status'    =>  'error',
                   'message'  =>  'La oferta de trabajo no existe'
               );
           }     
   
           return response()->json($data, $data['code']);
       }
   
       /**
        *   Metodo update que modifica los datos de la oferta de trabajo: JobOffer.
        *   Recibe los datos desde el formulario en json.
        *   Los descifra a un array.
        *   Los valida.
        *   Bloquea campos para no ser modificados.
        *   Realiza el update.
        * @param Request json con los datos de actaulizacion del objeto JobOffer
        * @return json de success o error. En caso de success devuelve el objeto JobOffer y 
        * un array con los cambios
        */
       public function update($id, Request $request){
           $json = $request->input('json', null);
   
           $params = json_decode($json);
           $params_array = json_decode($json, true);
   
   
           // unset los indices que no quiero actualizar
           //unset()
   
           // Buscar y recuperar objeot
           $jobOffer = JobOffer::find($id);
   
           // Chequear si objeto existe (si oferta existe)
           if(is_object($jobOffer)){
           // Actualizar objeto
           $jobOffer->title    = $params->title;
           $jobOffer->content  = $params->content;
           $jobOffer->image    = $params->image;
           $jobOffer->salary   = $params->salary;
           $jobOffer->type     = $params->type;
           $jobOffer->category_id = $params->category_id;
   
           // Guadar objeto
           $jobOffer->save();
   
           // Crear array datos
           $data = array (
               'code'      =>  200,
               'status'    =>  'success',
               'jobOffer'  =>  $jobOffer
           );
           }else{
               $data = array (
                   'code'      =>  400,
                   'status'    =>  'error',
                   'message'  =>  'La oferta de trabajo no existe - metodo update'
               );
           } 
   
           return response()->json($data, $data['code']);
       }
   
        /**
        *    Metodo que actualiza la propiedad 'status_id' de registro
        * de tabla JobOffer y le da valor: 1.
        * @param Request json con los datos de actaulizacion del objeto JobOffer
        * @return json de success o error. En caso de success devuelve el objeto JobOffer y 
        * un array con los cambios
        */  
        public function updateJobOfferStatusChangeToOne($id){
     
               // Buscar y recuperar objeot
               $jobOffer = JobOffer::find($id);
      
               
               // Chequear si objeto existe (si oferta existe)
               if(is_object($jobOffer)){
               // Actualizar objeto
               $jobOffer->status_id   = '1'; 
       
               // Guadar objeto
               $jobOffer->save();
       
               // Crear array datos
               $data = array (
                   'code'      =>  200,
                   'status'    =>  'success',
                   'jobOffer'  =>  $jobOffer
               );
               }else{
                   $data = array (
                       'code'      =>  400,
                       'status'    =>  'error',
                       'message'  =>  'La oferta de trabajo no existe - metodo update propiedad filled'
                   );
               } 
       
               return response()->json($data, $data['code']);
        }

        /**
        *    Metodo que actualiza la propiedad 'status_id' de registro
        * de tabla JobOffer y le da valor: 2.
        * @param Request json con los datos de actaulizacion del objeto JobOffer
        * @return json de success o error. En caso de success devuelve el objeto JobOffer y 
        * un array con los cambios
        */ 
        public function updateJobOfferStatusChangeToTwo($id){
     
            // Buscar y recuperar objeot
            $jobOffer = JobOffer::find($id);
   
            
            // Chequear si objeto existe (si oferta existe)
            if(is_object($jobOffer)){
            // Actualizar objeto
            $jobOffer->status_id   = '2'; 
    
            // Guadar objeto
            $jobOffer->save();
    
            // Crear array datos
            $data = array (
                'code'      =>  200,
                'status'    =>  'success',
                'jobOffer'  =>  $jobOffer
            );
            }else{
                $data = array (
                    'code'      =>  400,
                    'status'    =>  'error',
                    'message'  =>  'La oferta de trabajo no existe - metodo update propiedad status_id'
                );
            } 
    
            return response()->json($data, $data['code']);
     }


       /**
        *   Metodo que elimina el registro de la oferta de trabajo seleccionada.
        * @return array $data Devuelve un array de datos informando si la operacion
        * ha sido exitoso o ha ocurrido un error,
        * @param Integer $id Id de la oferta de trabajo(JobOffer) a eliminar
        */   
       public function destroy($id, Request $request){
           // Conseguir usuario identificado
            $user = $this->getIdentity($request);
            
            // Conseguir el registro
            $jobOffer = JobOffer::where('id',$id)->where('user_id', $user->sub)->first();

            if(!empty($jobOffer))
           {
               $jobOffer-> delete();
   
               $data = array (
                   'code'      =>  200,
                   'status'    =>  'success',
                   'message'  =>  'Oferta de trabajo eliminada'
               );
           }
           else{
               $data = array (
                   'code'      =>  400,
                   'status'    =>  'error',
                   'message'  =>  'La oferta de trabajo no existe o no tiene permisos para borrarla- metodo destroy'
               );
           } 
   
           return response()->json($data, $data['code']);
       }
   
        /**
        *    Metodo que recibe una imagen de la peticion. Y la sube al servidor,
        * al disco. Asociandola con la JobOffer.
        * @param Request Recibe un fichero desde la peticion. Solo acepta formato JPG, JPEG, PNG
        * @return json de success o error. En caso de success devuelve el nombre de imagen
        */
       public function upload(Request $request){
              $image = $request->file('file0');
   
              $validate = \Validator::make($request->all(), [
                  'file0'     =>  'required|mimes:jpg,jpeg,png'
              ]);
      
                  if(!$image || $validate->fails())
                  {
                      $data = [
                          'code'      =>  400,
                          'status'    =>  'error',
                          'message'   =>  'Fallo al subir la imagen'
                      ];
                  }
                  else
                  {              
                      $image_name = time().$image->getClientOriginalName();
      
                      \Storage::disk('images')->put($image_name, \File::get($image));
      
                      $data= [
                          'code'      =>  200,
                          'status'    =>  'success',
                          'image'     =>  $image_name
                      ];
                  }
                  
                  return response()->json($data,$data['code']);
       }
   
       /**
        *    Metodo que recupera la imagen del JobOffer.
        * @param String recibe el nombre del fichero a mostrar
        * @return String si encuentra el fichero, devuelve el nombre del fichero
        */
       public function getImage($filename){
           $isset = \Storage::disk('images')->exists($filename);
   
           if($isset)
           {
               $file = \Storage::disk('images')->get($filename);
   
               return new Response($file,200);
           }
           else
           {
               $data = [
                   'code'  =>  404,
                   'status'=>  'error',
                   'message'=> 'La imagen no existe'
               ];
           }
   
           return response()->json($data,$data['code']);
       }
   
   
   
        /**
        *    Metodo que recupera todos los registros de la tabla JobOffers
        * de la categoria seleccionada.
        * @param String recibe el id de la categoria
        * @return json Devuelve un json con un array de objetos JobOffer
        */
       public function getJobOffersByCategory($id){
           $jobOffers  = JobOffer::where('category_id', $id)->get();
   
           $data = array(
               'code'      =>  200,
               'status'    =>  'success',
               'jobOffers'     =>  $jobOffers
           );
   
           return response()->json($data,$data['code']);
       }
 

       /**
        *    Metodo que recupera todos los registros de la tabla JobOffers
        * del usuario seleccionado, que el user ha creado.
        * @param String recibe el id del usuario
        * @return json Devuelve un json con un array de objetos JobOffer
        */
       public function getJobOffersByUser($id){
           $jobOffers  = JobOffer::where('user_id', $id)->get();
   
           $data = array(
               'code'      =>  200,
               'status'    =>  'success',
               'jobOffers'     =>  $jobOffers
           );
   
           return response()->json($data,$data['code']);
       }
   
}
