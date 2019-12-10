<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('project_name', 100);
            $table->string('file_name', 100);
            $table->text('sound_url');
            $table->string('sound_name', 100);
            $table->integer('sound_duration');
            $table->enum('status', ['share', 'publish', 'draft', 'ready']);
            $table->double('frame_rate');
            $table->double('project_width');
            $table->double('project_height');
            $table->double('duration');
            $table->tinyInteger('resolution');
            $table->tinyInteger('project_flag');
            $table->string('watermark', 200);
            $table->string('watermark_url', 200);
            $table->enum('watermark_type', ['text', 'image']);
            $table->double('music_volume')->default(1);
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            
            $table->index('user_id');
            $table->unique(['id', 'user_id']);
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
