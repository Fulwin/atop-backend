<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('Cate_Id')->default(0);
            $table->string('Cate_Title')->nullable();
            $table->string('Cate_IdPath')->nullable();
            $table->string('Cate_Image')->nullable();
            $table->text('Cate_Intro')->nullable();
            $table->string('Cate_HasChild')->nullable();
            $table->string('Cate_Key')->nullable();
            $table->string('Cate_Lang')->nullable();
            $table->string('Cate_AddTime')->nullable();
            $table->unsignedInteger('Cate_Order')->default(0);
            $table->string('Cate_ParentID')->nullable();
            $table->string('Cate_Url')->nullable();
            $table->string('Cate_Module')->nullable();
            $table->string('Cate_ManageUrl')->nullable();
            $table->string('Cate_ManageName')->nullable();
            $table->string('Cate_State')->nullable();
            $table->string('Cate_IsMenu')->nullable();
            $table->string('Cate_Guid')->nullable();
            $table->string('Cate_ModelKeyId')->nullable();
            $table->string('Cate_SEOTitle')->nullable();
            $table->string('Cate_SEOKeyWord')->nullable();
            $table->string('Cate_SEODescription')->nullable();
            $table->string('Cate_ExField1')->nullable();
            $table->string('Cate_ExField2')->nullable();
            $table->string('Cate_ExField3')->nullable();
            $table->string('Cate_ExField4')->nullable();
            $table->string('Cate_ExField5')->nullable();
            $table->string('Cate_ExField6')->nullable();
            $table->string('Cate_ExField7')->nullable();
            $table->string('Cate_ExField8')->nullable();
            $table->string('Cate_ExField9')->nullable();
            $table->string('Cate_ExField10')->nullable();

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
        Schema::dropIfExists('categories');
    }
}
