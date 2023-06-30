<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Category;
use App\User;


class PruebasController extends Controller
{
    public function index(){
        // Crea array de animales
        $animales = ['Perro','Gato','Tigre'];

        // Crea un string con el titulo
        $titulo = 'Animales';

        // Pasa el array a la vista los datos del array
        return view('pruebas.index', array(
            'titulo'=>  $titulo,   //  Se agrega al array para que pase tambien
                                    //  variable titulo.
            'animales'=> $animales
        ));
    }

    // Metodo para hacer pruebas
    public function testOrm(){

    /*   Codigo que muestra los posts
        $posts = Post::all();       // Saca array de objetos con todos datos 
                                    //-> pero dara un objeto Eloquent no legible
      //  var_dump($posts);

    


        foreach($posts as $post){
            //  Accedo a propiedades de objeto Post
            echo "<h1>" . $post->title . "</h1>";
            echo "<p>" . $post->content . "</p>";

            //   Acceder a variable de otra tabla relacionada
            echo "<p style='color:gray'>{$post->user->name} - {$post->category->name}</p>";
            echo "<hr>";
        }
    */

        // Sacar todo de todas categorias
        $categories = Category::all();
         // Codigo que hace que por cada categoria se muestren los posts.
      // NO ES NECESARIO -> TODO SE SACA A PARTIR DE LAS RELACIOENS CON EL MODELO CATEGORY  $posts = Post::all();       // Saca array de objetos con todos datos 
         //-> pero dara un objeto Eloquent no legible

        foreach($categories as $category){
            echo "<h1>{$category->name}</h1>";


           // ANTES  foreach($posts as $post){

            foreach($category->posts as $post){
                //  Accedo a propiedades de objeto Post
                echo "<h3>" . $post->title . "</h3>";
                echo "<p>" . $post->content . "</p>";
    
                //   Acceder a variable de otra tabla relacionada
                echo "<p style='color:gray'>{$post->user->name} - {$post->category->name}</p>";
                
            }
            echo "<hr>";
        }

        die();      //  Utilizanso die()  conseguimos que corte ejecucion programa y no pida ninguna vista
    }

    

}
