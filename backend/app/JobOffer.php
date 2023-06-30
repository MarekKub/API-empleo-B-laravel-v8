<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 *  Clase que mapea la tabla 'job_offers'
 * @author Marek Kubicki
 * @version 1.1.1
 * @author Marek Kubicki
 * @version 1.0.1
 */
class JobOffer extends Model
{
    /**
     * Tabla a mapear
     */
    protected $table = 'job_offers';

    /**
     * Campos que peudo llenar de manera masiva, puedo hacer operacioens de CRUD
     */ 
   protected $fillable = ['title','content','category_id', 'image','salary','type'];

    /**
     *   Establece una relacion de uno a muchos inversa: de muchos a uno.
     *   Muchas ofertas pueden ser creadas por un usuario. 
     */
    public function user(){
        return $this->belongsTo('\App\User', 'user_id');    
        // Permite sacar los objeto de usuario relacionados por el user_id
    }

    /**
     * Relacion uno muchos, una oferta de empleo tiene muchos candidatos,
     *  en el hasMany() le pasa lo ruta relativa del modelo
     */
    public function applicants(){
        return $this->hasMany('\app\User.php');
    }

    
    /**
     * Permite sacar los objeto de Category relacionados por el category_id
     */
    public function category(){
        return $this->belongsTo('App\Category', 'category_id');
    }
}
