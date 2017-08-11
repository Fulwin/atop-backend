<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProvincesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->increments('id');
            $table->string('Province_Id')->nullable();
            $table->string('Province_Title')->nullable();
            $table->string('Province_IsCenter')->nullable();
            $table->string('Province_HasChild')->nullable();
            $table->string('Province_ParentId')->nullable();
            $table->string('Province_IdPath')->nullable();
            $table->string('Province_Level')->nullable();
            $table->string('Province_State')->nullable();
            $table->string('Province_AddTime')->nullable();
            $table->string('Province_ExFlag1')->nullable();
            $table->string('Province_ExFlag2')->nullable();
            $table->string('Province_ExFlag3')->nullable();
            $table->string('Province_ExFlag4')->nullable();
            $table->string('Province_ExFlag5')->nullable();
            $table->string('Province_ExFlag6')->nullable();
            $table->string('Province_ExFlag7')->nullable();
            $table->string('Province_ExFlag8')->nullable();
            $table->string('Province_ExFlag9')->nullable();
            $table->string('Province_ExFlag10')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('provinces');
    }
}
