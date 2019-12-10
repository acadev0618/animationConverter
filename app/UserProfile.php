<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    //
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'activated', 'activation_code', 'banned', 'api_key', 'current_plan', 'persist_code', 'image_ext',
        'company', 'address', 'city', 'postal_code', 'country', 'state_code', 'phone', 'credit_card_number', 'credit_card_expire_on', 'credit_card_name', 'credit_card_cvv'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
