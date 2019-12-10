<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    /**
     * The roles that belongs to the user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role', 'role_user', 'user_id', 'role_id');
    }
    
    public function plans()
    {
        return $this->belongsToMany('App\Plan', 'user_plans', 'user_id', 'plan_id');
    }
    
    public function user_role()
    {
        return $this->hasOne('App\RoleUser', 'user_id');
    }
    
    public function user_plan()
    {
        return $this->hasOne('App\UserPlan', 'user_id');
    }
    
    public function user_profile()
    {
        return $this->hasOne('App\UserProfile');
    }
    
    public function files()
    {
        return $this->hasMany('App\Models\File');
    }
    
    public function messages()
    {
        return $this->hasMany('App\Models\Message');
    }
}
