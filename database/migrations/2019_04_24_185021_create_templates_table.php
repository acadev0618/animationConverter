<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('project_id');
            $table->string('temp_name');
            $table->longText('data_json');
            $table->string('bg_image_url');
            $table->string('thumb_url');
            $table->double('duration');
            $table->boolean('text_template');
            $table->enum('aspect_type', ['', 'Square', 'Vertical', 'Portrait', 'Landscape']);
            $table->enum('asset_type', ['', 'Mixed', 'Photo-only', 'Video-only']);
            $table->boolean('text_order');
            $table->enum('temp_type', ['bodymovin', 'template', 'custom']);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            
            $table->index('project_id');
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('templates');
    }
}
