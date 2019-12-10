<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->bigIncrements('country_id');
            $table->string('code', 4)->index();
            $table->string('name', 64)->index();
            $table->string('alias_name1', 64)->index();
            $table->string('alias_name2', 64)->index();
            $table->string('full_name', 128);
            $table->string('iso3', 6);
            $table->smallInteger('number');
            $table->string('continent_code', 4);
            $table->smallInteger('display_order');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
