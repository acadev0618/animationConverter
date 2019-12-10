<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tags', 'description', 'file_type', 'file_name', 'origin_file_name', 'duration', 'thumb_url'
    ];
}
