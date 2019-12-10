<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoTemplates extends Model
{
    //
    protected $table = 'video_templates';
    protected $fillable = [
        'user_id', 'temp_name', 'temp_description', 'data_json', 'render_url', 'sound_url', 'width', 'height', 'duration', 'thumb_url', 'bg_image_url', 'asset_type', 'status', 'is_model', 'aspect_group', 'media_type', 'aspect', 'design_type', 'category'
    ];
}
