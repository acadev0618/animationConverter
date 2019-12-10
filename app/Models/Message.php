<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    CONST REQUEST_STATUS_OPEN = 'open';
    CONST REQUEST_STATUS_DONE = 'solved';
    CONST REQUEST_STATUS_FAIL = 'reject';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'message_subject', 'message_content', 'attached_file'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
