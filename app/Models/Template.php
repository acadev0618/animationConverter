<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'project_id', 'temp_name', 'data_json', 'bg_image_url', 'thumb_url', 'duration', 'text_template', 'temp_type', 'text_order'
    ];
}
