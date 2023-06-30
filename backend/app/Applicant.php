<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 *  Clase que mapea la tabla 'applicants'
 * @author Marek Kubicki
 * @version 1.0.2
 */
class Applicant extends Model
{
  /**
   * Tabla  a mapear
   */
  protected $table = 'applicants';
    
  /**
   * Campos masivamente rellenables
   */
  protected $fillables=['jobOffer_id','user_id'];

  /**
   *   Permite sacar los objeto de Applcatns  relacionados por el jobOffer_id,  
   * es decir, todos los candidatos por oferta: Relacion 1:M inversa
   */ 
  public function jobOffer(){
      return $this->belongsTo('App\JobOffer', 'jobOffer_id');
  }

  /**
   * Relacion muchas a uno, un usuario tiene se apunta a muchas ofertas de empleo,
   *  permite sacar todos las ofertas de empleo a las que se ha apuntado el usuario.
   */
  public function applicant(){
      return $this->belongsTo('App\User', 'user_id');
  }
}
