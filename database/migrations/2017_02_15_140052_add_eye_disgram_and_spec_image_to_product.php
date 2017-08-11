<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEyeDisgramAndSpecImageToProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('products', function (Blueprint $table) {
          $table->string('Products_EyeDiagram1')->nullable();
          $table->string('Products_EyeDiagram2')->nullable();
          $table->string('Products_EyeDiagram3')->nullable();
          $table->string('Products_MechanicalSpecification')->nullable();
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
