<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response; 
use App\Category;

/**
 * Clase que gestiona las operaciones de CRUD con la tabla de categories
 * en el Backend.
 * @author Marek Kubicki
 * @version 1.4.1
 */
class CategoryController extends Controller
{
      /**
     * Constructor. Carga el middleawerae api.auth para todos los
     * metodos, menos para index() y show()
     */
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index','show']]);
    }

    /**
     *  Metodo que recupera todos los registros  de la tabla categories,
     * si sucede algun error o no existen los registros muestra un error.
     * @return Object Devuelve un objeto con las categorias y sus datos
     */
    public function index(){
        $categories = Category::all();

        if($categories){
            $data = array(
                'code'      => 200,
                'status'    => 'success',
                'categories'=>  $categories
            );
        }
        else{
            $data = array(
                'code'      => 400,
                'status'    => 'error',
                'message'   => 'Sucedio un erro al buscar las categories CategoryController:index'  
            );
        }

        return response()->json($data,$data['code']);
    }

    /**
     * Metodo que devuelve el objeto con los datos del registro
     * de la DB con el id que se le pasa por parametro.
     * @param Integer numero del id de la categoria a mostrar
     * @return Array devuelve un array de datos de la categoria
     */
    public function show($id){
        $category = Category::find($id);

        if($category){
            $data = array(
                'code'      =>  200,
                'status'    =>  'success',
                'category'  =>  $category
            );
        }
        else{
            $data = array(
                'code'      => 400,
                'status'    => 'error',
                'message'   => 'Sucedio un erro al buscar la categoria CategoryController:show'  
            );
        }

        return response()->json($data, $data['code']);
    }

    /**
     *   Metodo que recibe el nombre de la categoria a crear
     * y la crea en la DB.
     * @param String Por request recibe un json con indice name que es un
     * string con el nombre de la categoria.
     * @return Array Devuelve un array de datos.
     */
    public function store(Request $request){
        
        $json = $request->input('json',null);

        $params = json_decode($json);
        $params_array = json_decode($json, true);

        $params_array = array_map('trim', $params_array);

        $validate = \Validator::make($params_array,[
            'name'  =>  'required|alpha'
        ]);

        if(!empty($params) && !empty($params_array)){
            if($validate->fails()){
                $data = array(
                    'code'      =>  400,
                    'status'    =>  'error',
                    'message'   =>  'Error, no se guardo la categoría, fallo de validación.'
                );
            }
            else{
                $category = new Category();
                $category-> name = $params_array['name'];
                $category->save();

                $data = array(
                    'code'      =>  200,
                    'status'    =>  'success',
                    'message'   =>  'Categoría guardada',
                    'category'  =>  $category
                );
            }


        }
        else{
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message'   =>  'Sucedió un error al guardar la categoría.'
            );
        }
        
        return response()->json($data, $data['code']);

    }

    /**
     *  Metodo para la actualizacion de una categoria.
     *  @param Request Recibe un json con los datos a actualizar
     * de la categoria.
     * @return token Devuelve un json con los datos de la categoria
     * y los cambios realizados.
     */
    public function update($id, Request $request){
        $json = $request->input('json',null);

        $params_array= json_decode($json, true);

        
        if(!empty($params_array)){
        
            $validate = \Validator::make($params_array, [
                'name'  =>  'required'
            ]);

            unset($params_array['id']);
            unset($params_array['created_at']);

            $category = Category::where('id',$id)->update($params_array);

            $data = [
                'code'      =>  200,
                'status'    =>  'success',
                'category'  =>  $params_array
            ];
        }
        else{
            $data = array(
                'code'      =>  400,
                'status'    =>  'error',
                'message'   =>  'Error en update() de CategoryController'
            );
        }

        return response()->json($data,$data['code']);

    }
}
