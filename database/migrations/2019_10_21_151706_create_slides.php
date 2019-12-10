<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSlides extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slides', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id')->index();
//            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('name', 100)->default('Veasy Slide');
            $table->longText('data_json');
            $table->double('width');
            $table->double('height');
            $table->double('duration');
            $table->string('thumb_url', 200)->nullable(true);
            $table->enum('aspect', ['portrait','square','vertical','wide','custom'])->default('custom');
            $table->string('category', 100)->default('e-commerce');
            $table->string('design_type', 100)->default('[]');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            //
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('slides', function (Blueprint $table) {
            //
            $table->dropIfExists();
        });
    }
}
