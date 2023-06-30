<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Applicant;
use App\User;

use App\Helpers\JwtAuth;

/**
 * Clase que gestiona las operaciones de CRUD con la tabla de
 *  applicants en el Backend.
 * @author Marek Kubicki
 * @version 1.9.3
 */
class ApplicantController extends Controller
{
    /**
     * Metodo de prueba
     * @param Request recibe la request
     * @return String devuelve un string de saludo.
     */ 
    public function prueba(Request $request){    
        return 'Hola desde el controlador de Apllicatn, metodo prueba';
    }

    /**
     *   Recibe el id del usuario por parametro en la url y token de identificacion del user,
     * que esta almacenado en Local Storage. REcupera al usuario a partir de el y 
     * devuelve el objeto usuario con los datos del usuario.
     * @param id Integer con el id del usuario
     * @return Object Objeto user con los datos del usuario
     */
    public function getIdentity(Request $request){
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization');
        $user = $jwtAuth->checkToken($token, true);

        return $user;
    }

    /**
     *    Metodo que realiza el registro en la tabla applicants.
     * @param Integer $id Entero que recibe el id de la JobOffer
     * @param Object $identity OBjeto identity almacenado el Local Storage 
     * con los datos del usuario identificado.
     * @return JSON Un JSON con un indece jobOffer que guarda el objeto
     * que representa el registro de la tabla applicant recueprado.
     */
    public function store($id, Request $request){
      
            $user = $this->getIdentity($request);          

            if(is_object($user)){
                $applicant = new Applicant();

                $applicant->jobOffer_id = $id;
                $applicant->user_id  = $user->sub;

                $applicant->save();
              
                 $data = array(
                    'code'      =>  200,
                    'status'    =>  'success',
                     'jobOffer'   =>  $applicant
                );
            }
            else{
                $data = array(
                    'code'      =>  400,
                    'status'    =>  'error',
                    'message'   =>  'Error al guardar el objeto, en JobOfferController::store'
                );
            }        

        return response()->json($data, $data['code']);
    }

    /**
     *      Metodo que muestra los datos de un registro de la tabla Applicants.
     * @param Integer $id : parametro que recbie por la URL con el id del usuario a mostrar
     * @return JSON con un objeto JSON con inice applicant que guarda el objeto del registro applicant
     */
    public function show($id){
        $applicant = Applicant::find($id)->load('applicant')->load('jobOffer');

        if(is_object($applicant)){
            $data = array(
                'code'      =>  200,
                'status'    =>  'success',
                'applicant' =>  $applicant
            );
        }
        else{
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message' =>  'El registro no existe'
            );
        }

        return response()->json($data, $data['code']);
    }

    /**
     *      Metodo que muestra los registros tabla Applicants por id de JobOffer,
     * es decir, todos los registros cuyo campo JobOffer_id coincida con el parametro
     * pasado por URL
     * @param Integer $id : parametro que recbie por la URL con el id del JobOffer_id 
     * por el que realizar la consulta select.
     * @return JSON con un objeto JSON con inice applicant que guarda el objeto con 
     * los  registros applicant qeu cumplen con la condición del SELECT
     */   
    public function getApplicantsByOffer($id){

        // JOIN CON TABLA users
        $applicants = Applicant::join('users','users.id','applicants.user_id')
                    ->where('jobOffer_id', $id)->get();

        if(is_object($applicants)){
            $data = array(
                'code'      =>  200,
                'status'    =>  'success',
                'applicants' =>  $applicants
            );
        }
        else{
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message' =>  'El existen ningún registro de demandante'
            );
        }

        return response()->json($data,$data['code']);
    }

    /**
     *    Metodo que recupera el objeto aplicant con el id que se le pasa por URL, 
     * y tambien carga los datos del objeto user/tabla user relacionada por Foreign Key.
     * @param Integer $id : parametro que recbie por la URL con el id del user_id 
     * por el que realizar la consulta select.
     * @return JSON con un objeto JSON con inice applicant que guarda el objeto con 
     * los  registros applicant qeu cumplen con la condición del SELECT
     */
    public function getApplicantByUserId($id){

        // JOIN CON TABLA users
        $applicant = Applicant::join('users','users.id','applicants.user_id')
                    ->where('user_id', $id)->first();

        if(is_object($applicant)){
            $data = array(
                'code'      =>  200,
                'status'    =>  'success',
                'applicant' =>  $applicant
            );
        }
        else{
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message' =>  'El existen ningún registro de demandante'
            );
        }

        return response()->json($data,$data['code']);
    }

    /**
     *    Metodo que recupera los registros de tabla  aplicant con el id del usuario: user_id,
     *  que se le pasa por URL que es el id del usuraio, campo user_id de tabla applicants, 
     * y tambien carga los datos del objeto jobOffer/tabla jobOffer relacionada por Foreign Key.
     * @param Integer $id : parametro que recbie por la URL con el id del user_id 
     * por el que realizar la consulta select.
     * @return JSON con un objeto JSON con indice applicant que guarda el objeto con 
     * los  registros applicant qeu cumplen con la condición del SELECT: todos los registros 
     * de la tabla Applicants que tengan valor de su campo user_id el pasado por parametro
     */
    public function getAllApplicantsByUserId($id){

        $applicant = Applicant::join('job_offers','job_offers.id','=', 'applicants.jobOffer_id')    // PARA MI: aqui hago consulta JOIN que no tiene porque referirse al parametro del metodo, no lo hace, solo compara dos campos de dos tablas
            ->where('applicants.user_id', '=', $id)                     // PARA MI: aqui establezco la condicion de seleccion where, que el campo user_id de tabla applicants sea igual a parametro pasado en metodo
            ->get();                // Devuelvo todo 

        if(is_object($applicant)){
            $data = array(
                'code'      =>  200,
                'status'    =>  'success',
                'applicants' =>  $applicant
            );
        }
        else{
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message' =>  'El existen ningún registro de demandante'
            );
        }

        return response()->json($data,$data['code']);
    }

    /**
     *      Metodo que devuelve todos registros de tabla applicant
     * @return JSON con un objeto JSON con indice applicant que guarda el objeto con 
     * todos los registros applicant de la tabla Applicants
     */
    public function index(){
        $applicants = Applicant::all();

        if($applicants){
            $data = array(
                'status'    =>  'success',
                'code'      =>  200,
                'applicants' =>  $applicants
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
     *    Metodo que recupera el objeto aplicant con el user_id y jobOffer_id que se le pasa por URL, 
     * y tambien carga los datos del objeto user/tabla user relacionada por Foreign Key.
     * @param Integer $user_id : parametro que recbie por la URL con el id del user_id 
     * por el que realizar la consulta select.
     * @param Integer $jobOffer_id : parametro que recbie por la URL con el id de la jobOffer
     * por el que realizar la consulta select.
     * @return JSON con un objeto JSON con inice applicant que guarda el objeto con 
     * los  registros applicant qeu cumplen con la condición del SELECT
     */
public function getApplicantByUserIdAndJobOfferId($jobOffer_id, $user_id){

    // JOIN CON TABLA users
    $applicant = Applicant::join('users','users.id','applicants.user_id')
                ->where('user_id', $user_id)
                ->where('jobOffer_id',  $jobOffer_id)
                ->first();

    if(is_object($applicant)){
        $data = array(
            'code'      =>  200,
            'status'    =>  'success',
            'applicant' =>  $applicant
        );
    }
    else{
        $data = array(
            'code'      =>  400,
            'status'    =>  'error',
            'message' =>  'NO existen ningún registro de demandante'
        );
    }

    return response()->json($data,$data['code']);
}
}
