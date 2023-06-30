<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\User;

/**
 * Clase helper que gestiona la autenticacion del usuario 
 * y las sesiones (permite al usuario estar identificado
 * durante la sesion)
 * @author Marek Kubicki
 * @version 1.2.0
 */
class JwtAuth
{
    public $key;

    public function __construct()
    {
        $this->key = 'esto_es_una_clave_top_secreta-99887766';
    }

    /**
     * Metodo de login que recibe un json con email y password,
     * y en caso de que exista devuelve los datos codificados en
     * un token, y en caso de que no devuelve los datos introducidos.
     */
    public function signup($email, $password,$getToken = null)
    {
        //   Buscar si existe el usuario con sus credenciales
        $user = User::where([
            'email'     =>  $email,
            'password'  =>  $password
        ])->first(); 

        //   Comprobar si son correctas (objeto)
        $signup = false;
        if(is_object($user))
        {
            $signup = true;
        }

        //   Generar el token con los datos del usuario identificado
        if($signup)
        {
            $token = array(
              'sub'     =>  $user->id,  
              'email'   =>  $user->email,
              'name'    =>  $user->name,
              'surname' =>  $user->surname,
              'role_id' =>  $user->role_id,
              'description' => $user->description,
              'image'   =>  $user->image,
              'curriculo'=> $user->curriculo,
              'iat'     =>  time(),
              'exp'     =>  time() + (7 * 24 * 60 * 60)
            );

            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);

            //   Devolver los datos decodificados o el token,en funcion 
            // de un parametro
            if(is_null($getToken))
            {
                $data = $jwt;    // si es no es null devuelve el token
            }
            else
            {
                $data = $decoded;
            }
        }
        else
        {
            $data = array(
                'status' => 'error',
                'message'=> 'El login ha fallado'
            );            
        }
        return $data;
    }    
    
    /**
     * Permite analizar el token generado para comprobar que user está identificado,
     * @param jwt Token codificado
     * @param getIdentity  Booleano que indica 
     */
    public function checkToken($jwt, $getIdentity = false)
    {
        $auth = false;

        try
        {
            $jwt = str_replace('"','',$jwt);
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);
        } catch(\UnexpectedValueException $e){
            $auth = false;
        } catch(\DomainException $e){
            $auth = false;
        }

        if(!empty($decoded) && is_object($decoded) && isset($decoded->sub))
        {
            $auth = true;
        }
        else
        {
            $auth = false;
        }

        if($getIdentity)
        {
            return $decoded;
        }

        return $auth;
    }
}
?>