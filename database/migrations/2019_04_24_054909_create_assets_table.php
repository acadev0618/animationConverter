<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('tags', 100);
            $table->text('description');
            $table->enum('file_type', ['sound', 'graphics', 'shapes', 'lines', 'pattern', 'texture', 'photo', 'video']);
            $table->string('file_name');
            $table->string('origin_file_name');
            $table->double('duration');
            $table->string('thumb_url');
            $table->tinyInteger('temp_type')->index();
            $table->text('data_json');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
            $table->index('tags');
            $table->index('file_type');
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assets');
    }
}
