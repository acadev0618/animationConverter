<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideoTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('video_templates', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id')->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('temp_name', 100)->default('Video Template');
            $table->string('temp_description', 500)->nullable(true);
            $table->longText('data_json');
            $table->text('render_url')->nullable(true);
            $table->text('sound_url')->nullable(true);
            $table->double('width');
            $table->double('height');
            $table->double('duration');
            $table->string('thumb_url', 200)->nullable(true);
            $table->string('bg_image_url', 200)->nullable(true);
            $table->enum('aspect_type', ['Custom', 'Landscape', 'Square', 'Vertical', 'Portrait'])->default('Custom');
            $table->enum('asset_type', ['Custom', 'Mixed', 'Photo-only', 'Video-only'])->default('Custom');
            $table->enum('status', ['share', 'publish', 'draft', 'ready'])->default('draft');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('video_templates');
    }
}
