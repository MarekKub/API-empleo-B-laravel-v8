<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//  1  Imports  de modelos
use App\User;
use App\Category2;
use App\Post2;

class Repaso3Controller extends Controller
{
    //  2 Metodo para probar el orm (desde de importar modelos)
    public function test()
    {
        
        //   Creo un objeto que tiene el ResultSet de posts, porque
        // quiero obtener todos los posts.
        $posts = Post2::all();

        //   Recorro el resultset y accedo a sus propiedades (puedo
        // acceder porque he programado las foreign keys)
        
        // echo $posts;   //  ---> Esto imprime todo el resultset en un json creo
        foreach($posts as $post)
        {
            echo "Nombre: $post->title <br>";
        }


        

    }
}
