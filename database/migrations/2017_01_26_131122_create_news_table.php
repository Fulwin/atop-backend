<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('News_Id')->nullable();
            $table->unsignedInteger('News_CateId')->nullable();
            $table->string('News_CateName')->nullable();
            $table->string('News_Title')->nullable();
            $table->string('News_Image')->nullable();
            $table->string('News_Video')->nullable();
            $table->string('News_Count')->nullable();
            $table->text('News_Content')->nullable();
            $table->string('News_State')->nullable();
            $table->string('News_Author')->nullable();
            $table->string('News_Source')->nullable();
            $table->string('News_IsIndex')->nullable();
            $table->string('News_IsUrl')->nullable();
            $table->string('News_Url')->nullable();
            $table->unsignedInteger('News_Order')->default(0);
            $table->string('News_Target')->nullable();
            $table->string('News_AddTime')->nullable();
            $table->string('News_MobTitle')->nullable();
            $table->string('News_MobState')->nullable();
            $table->string('News_MobBeTop')->nullable();
            $table->string('News_MobRele')->nullable();
            $table->string('News_MobImage')->nullable();
            $table->text('News_MobContent')->nullable();
            $table->string('News_MobExFlag1')->nullable();
            $table->string('News_MobExFlag2')->nullable();
            $table->string('News_MobExFlag3')->nullable();
            $table->string('News_SEOTitle')->nullable();
            $table->string('News_SEOKeyWord')->nullable();
            $table->string('News_SEODescription')->nullable();
            $table->string('News_TagTitle')->nullable();
            $table->string('News_TagSummary')->nullable();
            $table->string('News_ExFlag1')->nullable();
            $table->string('News_ExFlag2')->nullable();
            $table->string('News_ExFlag3')->nullable();
            $table->string('News_ExFlag4')->nullable();
            $table->string('News_ExFlag5')->nullable();
            $table->string('News_ExFlag6')->nullable();
            $table->string('News_ExFlag7')->nullable();
            $table->string('News_ExFlag8')->nullable();
            $table->string('News_ExFlag9')->nullable();
            $table->string('News_ExFlag10')->nullable();
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
        Schema::dropIfExists('news');
    }
}
