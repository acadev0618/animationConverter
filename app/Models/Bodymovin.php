<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bodymovin extends Model
{
    //
    protected $table = 'bodymovin';
    protected $fillable = ['json', 'type', 'width', 'height'];
}
