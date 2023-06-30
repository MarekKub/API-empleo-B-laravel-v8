<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Cargando clases
use App\Http\Middleware\ApiAuthMiddleware;



// **********************    RUTAS DE PRUEBAS *****************

Route::get('/welcome', function () {
    return view('welcome');
});


Route::get("/pruebas2",function(){
    $texto="Hola mundo desde pruebas2";     
    return view('pruebas2', array(          
        'texto'=>$texto
    ));
});

// **********************   RUTAS PROYECTO *****************

    // RUTAS DE PRUEBAS
  //  Route::get('/usuario/pruebas','UserController@pruebas');
  //  Route::get('/post/pruebas','PostController@Pruebas');
  //  Route::get('/category/pruebas','CategoryController@pruebas');

  
  // Route::group(['middleware' => 'cors'], function(){
    // RUTAS DEL CONTROLADOR DE USUARIO.
    
    Route::post('/api/register','UserController@register');
    Route::post('/api/login','UserController@login');
    Route::put('/api/user/update', 'UserController@update'); 
    Route::post('/api/user/uploadImage','UserController@uploadImage')->middleware(ApiAuthMiddleware::class);
    Route::post('/api/user/uploadPdf', 'UserController@uploadPdf')->middleware(ApiAuthMiddleware::class);
    Route::get('/api/user/getImage/{filename}','UserController@getImage');
    Route::get('/api/user/getpdf/{filename}', 'UserController@getPdf');
    Route::get('/api/user/detail/{id}','UserController@detail');

    // RUTAS DEL CONTROLADOR DE CATEGORIAS
    Route::resource('/api/category','CategoryController');
                                                                                                     
            
    // RUTAS DEL CONTROLADOR DE OFERTAS DE TRABAJO    
    Route::resource('/api/joboffer','JobOfferController');
    Route::post('/api/joboffer/upload','JobOfferController@upload');
    Route::get('/api/joboffer/image/{filename}','JobOfferController@getImage');
    Route::get('/api/joboffer/category/{id}', 'JobOfferController@getJobOffersByCategory');
    Route::get('/api/joboffer/user/{id}', 'JobOfferController@getJobOffersByUser');

    Route::post('/api/applicant/store/{id}', 'ApplicantController@store');

    Route::get('/api/applicant/get-applicants-by-job-offer/{id}', 'ApplicantController@getApplicantsByOffer');

// Netodo que recupera la oferta de trabajo en concreto que se pide
    Route::get('/api/applicant/get-applicant-by-user-id/{id}', 'ApplicantController@getApplicantByUserId');

// Metodo que recupera todos los registros de tabla applicant con user_id el que se
// se le pasa por parametro
    Route::get('/api/applicant/get-all-applicants-by-user-id/{id}', 'ApplicantController@getAllApplicantsByUserId');
   
// Ruta que ejecuta metodo que pone a 1 el campo 'status_id'  de la tabla jobOffers
    Route::post('/api/joboffer/update-filled-field-to-one/{id}','JobOfferController@updateJobOfferStatusChangeToOne');

// Ruta que ejecuta metodo que pone a 2 el campo 'status_id'  de la tabla jobOffers
    Route::post('/api/joboffer/update-filled-field-to-two/{id}','JobOfferController@updateJobOfferStatusChangeToTwo');


    Route::resource('/api/applicant', 'ApplicantController');

    Route::get('/api/applicant/get-applicant-by-user-id-and-joboffer-id/{joboffer_id}/{user_id}',
     'ApplicantController@getApplicantByUserIdAndJobOfferId');
    
// });