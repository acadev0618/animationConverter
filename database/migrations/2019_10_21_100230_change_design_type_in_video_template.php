<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeDesignTypeInVideoTemplate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('video_templates', function (Blueprint $table) {
            //
            $table->dropColumn(['design_type']);
        });
        Schema::table('video_templates', function (Blueprint $table) {
            //
            $table->string('design_type', 100)->default('[]');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('video_templates', function (Blueprint $table) {
            //
        });
    }
}
