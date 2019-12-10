<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_name', 'file_name', 'sound_url', 'sound_name', 'sound_duration',
        'status', 'frame_rate', 'project_width', 'project_height', 'duration',
        'resolution', 'project_flag', 'watermark', 'watermark_url', 'watermark_type', 'music_volume'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
