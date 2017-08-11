<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductFieldsForMpo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('mpo_connector_type')->nullable();
            $table->string('mpo_fiber_type')->nullable();
            $table->string('mpo_low_il')->nullable();
            $table->string('mpo_high_il')->nullable();
            $table->string('mpo_return_loss')->nullable();
            // wdm
            $table->string('wdm_channel_wavelength')->nullable();
            $table->string('wdm_adjacent_channel_isolation')->nullable();
            $table->string('wdm_non_adjacent_channel_isolation')->nullable();
            $table->string('wdm_insertion_loss')->nullable();
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
