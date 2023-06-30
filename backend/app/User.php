<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'surname', 'description' ,'email', 'password', 'role_id', 'image', 'curriculo'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    //  Establece una relacion de uno a muchos.
    //  Devuelve todos los JobOffers de un usuario. Cuando seleccione un ususario 
    // me sacara todos los JobOffers relacionados.
    public function jobOffers(){
        return $this->hasMany('\app\JobOffer');
    }
    
}
