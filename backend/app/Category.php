<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 *  Clase que mapea la tabla 'categories'
 * @author Marek Kubicki
 * @version 1.0.3
 */
class Category extends Model
{
     /**
     * Tabla a mapear
     */
    protected $table = 'categories';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * Relacion uno muchos, una categoria tiene muchos posts,
     *  en el hasMany() le pasa lo ruta relativa del modelo
     */
 /*   
    public function jobOffers(){
        return $this->hasMany('\app\JobOffer.php');
    }
 */   
}

