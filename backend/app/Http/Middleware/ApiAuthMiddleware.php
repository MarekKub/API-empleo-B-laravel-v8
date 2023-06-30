<?php

namespace App\Http\Middleware;

use Closure;

/**
 * Clase que gestiona la identificacion del usuario, dejando pasar o no a la API
 * segun el usuario se haya logueado/identificado o no.
 * @author Marek Kubicki
 * @version 1.0.0
 */
class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Comprobar si usuario esta identificado
        $token = $request -> header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checkToken = $jwtAuth->checkToken($token);

        // Si pasa checkToken
        if($checkToken)
        {
            return $next($request);
        }
        else{
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message'   =>  'Error en el middleware, usuario no identificado'
            );

            return response()->json($data,$data['code']);

        }

       
    }
}
