<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestUser extends Model
{
    protected $table = 'slides';

    protected $fillable = [
        'user_id', 'name', 'data_json', 'width', 'height', 'duration', 'thumb_url', 'aspect', 'design_type', 'category'
    ];


}
