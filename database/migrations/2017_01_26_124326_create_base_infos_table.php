<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBaseInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('base_infos', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('BaseInfo_Id')->default();
            $table->unsignedInteger('BaseInfo_CateId')->default(0);
            $table->string('BaseInfo_CateName')->nullable();
            $table->string('BaseInfo_Title')->nullable();
            $table->string('BaseInfo_State')->nullable();
            $table->string('BaseInfo_Image')->nullable();
            $table->text('BaseInfo_Content')->nullable();
            $table->unsignedInteger('BaseInfo_Order')->default(0);
            $table->string('BaseInfo_AddTime')->nullable();
            $table->string('BaseInfo_MobTitle')->nullable();
            $table->string('BaseInfo_MobState')->nullable();
            $table->string('BaseInfo_MobBeTop')->nullable();
            $table->string('BaseInfo_MobRele')->nullable();
            $table->string('BaseInfo_MobImage')->nullable();
            $table->string('BaseInfo_MobContent')->nullable();
            $table->string('BaseInfo_MobExFlag1')->nullable();
            $table->string('BaseInfo_MobExFlag2')->nullable();
            $table->string('BaseInfo_MobExFlag3')->nullable();
            $table->string('BaseInfo_SEOTitle')->nullable();
            $table->string('BaseInfo_SEOKeyWord')->nullable();
            $table->string('BaseInfo_SEODescription')->nullable();
            $table->string('BaseInfo_TagTitle')->nullable();
            $table->string('BaseInfo_TagSummary')->nullable();
            $table->string('BaseInfo_ExFlag1')->nullable();
            $table->string('BaseInfo_ExFlag2')->nullable();
            $table->string('BaseInfo_ExFlag3')->nullable();
            $table->string('BaseInfo_ExFlag4')->nullable();
            $table->string('BaseInfo_ExFlag5')->nullable();
            $table->string('BaseInfo_ExFlag6')->nullable();
            $table->string('BaseInfo_ExFlag7')->nullable();
            $table->string('BaseInfo_ExFlag8')->nullable();
            $table->string('BaseInfo_ExFlag9')->nullable();
            $table->string('BaseInfo_ExFlag10')->nullable();
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
        Schema::dropIfExists('base_infos');
    }
}
