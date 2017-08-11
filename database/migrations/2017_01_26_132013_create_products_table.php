<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('Products_ID')->default(0);
            $table->unsignedInteger('Products_CateID')->default(0);
            $table->string('Products_CateName')->nullable();
            $table->string('Products_Title')->nullable();
            $table->string('Products_CodeName')->nullable();
            $table->string('Products_Count')->nullable();
            $table->unsignedInteger('Products_Order')->default(0);
            $table->string('Products_State')->nullable();
            $table->string('Products_AddTime')->nullable();
            $table->string('Products_IsHot')->nullable();
            $table->string('Products_IsNew')->nullable();
            $table->string('Products_Prices')->nullable();
            $table->string('Products_BigImage')->nullable();
            $table->string('Products_MinImage')->nullable();
            $table->string('Products_FileIntro')->nullable();
            $table->text('Products_Introduction')->nullable();
            $table->string('Products_OtherInfo')->nullable();
            $table->string('Products_MobTitle')->nullable();
            $table->string('Products_MobState')->nullable();
            $table->string('Products_MobBeTop')->nullable();
            $table->string('Products_MobRele')->nullable();
            $table->string('Products_MobBigImage')->nullable();
            $table->string('Products_MobMinImage')->nullable();
            $table->string('Products_MobIntroduction')->nullable();
            $table->string('Products_MobExFlag1')->nullable();
            $table->string('Products_MobExFlag2')->nullable();
            $table->string('Products_MobExFlag3')->nullable();
            $table->string('Products_SEOTitle')->nullable();
            $table->string('Products_SEOKeyWord')->nullable();
            $table->string('Products_SEODescription')->nullable();
            $table->string('Products_TagTitle')->nullable();
            $table->string('Products_TagSummary')->nullable();
            $table->string('Products_ExFlag1')->nullable();
            $table->string('Products_ExFlag2')->nullable();
            $table->string('Products_ExFlag3')->nullable();
            $table->string('Products_ExFlag4')->nullable();
            $table->string('Products_ExFlag5')->nullable();
            $table->string('Products_ExFlag6')->nullable();
            $table->string('Products_ExFlag7')->nullable();
            $table->string('Products_ExFlag8')->nullable();
            $table->string('Products_ExFlag9')->nullable();
            $table->string('Products_ExFlag10')->nullable();
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
        Schema::dropIfExists('products');
    }
}
