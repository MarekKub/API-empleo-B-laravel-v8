<?php

namespace App\Http\Middleware;

use Closure;

/**
 *  Clase que guarda la logica para permitir las referencias 
 * de origin cruzado (CORS)
 * @author Marek Kubicki
 * @version 1.0.0
 */
class Cors
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
        return $next($request)

        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
}
