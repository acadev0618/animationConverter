<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'origin_file_name', 'file_name', 'file_type', 'duration', 'width', 'height', 'thumb_url'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
