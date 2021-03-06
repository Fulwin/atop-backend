<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDownloadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('downloads', function (Blueprint $table) {
            $table->increments('id');
            $table->string('Down_ID')->nullable();
            $table->string('Down_AddTime')->nullable();
            $table->unsignedInteger('Down_CateID')->default(0);
            $table->string('Down_CateName')->nullable();
            $table->text('Down_Content')->nullable();
            $table->string('Down_FileSize')->nullable();
            $table->string('Down_FileType')->nullable();
            $table->string('Down_Image')->nullable();
            $table->string('Down_LocalPath')->nullable();
            $table->unsignedInteger('Down_Order')->default(0);
            $table->string('Down_OtherPath')->nullable();
            $table->string('Down_SEODescription')->nullable();
            $table->string('Down_SEOKeyWord')->nullable();
            $table->string('Down_SEOTitle')->nullable();
            $table->string('Down_State')->default('1');
            $table->string('Down_TagSummary')->nullable();
            $table->string('Down_TagTitle')->nullable();
            $table->string('Down_Title')->nullable();
            $table->string('Down_ExFlag1')->nullable();
            $table->string('Down_ExFlag2')->nullable();
            $table->string('Down_ExFlag3')->nullable();
            $table->string('Down_ExFlag4')->nullable();
            $table->string('Down_ExFlag5')->nullable();
            $table->string('Down_ExFlag6')->nullable();
            $table->string('Down_ExFlag7')->nullable();
            $table->string('Down_ExFlag8')->nullable();
            $table->string('Down_ExFlag9')->nullable();
            $table->string('Down_ExFlag10')->nullable();
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
        Schema::dropIfExists('downloads');
    }
}
