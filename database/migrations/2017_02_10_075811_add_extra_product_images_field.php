<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddExtraProductImagesField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('products', function (Blueprint $table) {
          $table->string('Products_BigImage1')->nullable();
          $table->string('Products_BigImage2')->nullable();
          $table->string('Products_BigImage3')->nullable();
          $table->string('Products_BigImage4')->nullable();
          $table->string('Products_BigImage5')->nullable();
          $table->string('Products_BigImage6')->nullable();
          $table->string('Products_BigImage7')->nullable();
          $table->string('Products_BigImage8')->nullable();
          $table->string('Products_BigImage9')->nullable();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
