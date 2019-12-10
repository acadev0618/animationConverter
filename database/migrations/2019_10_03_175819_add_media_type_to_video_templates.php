<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMediaTypeToVideoTemplates extends Migration
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
            $table->enum('media_type', ['video', 'image'])->default('video');
            $table->string('category', 20)->default('e-commerce');
            $table->string('design_type', 20)->default('facebook');
            $table->dropColumn('aspect_type');
            $table->enum('aspect', ['portrait', 'square', 'vertical', 'wide', 'custom'])->default('custom');
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
            $table->dropColumn('media_type');
            $table->dropColumn('category');
            $table->dropColumn('design_type');
            $table->dropColumn('aspect');
        });
    }
}
