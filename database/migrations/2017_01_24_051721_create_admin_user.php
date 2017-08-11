<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\User;

class CreateAdminUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        User::create([
            'email'         =>'admin@atoptechnology.com',
            'password'      =>'$2y$10$67gzHTwfTjvrvL.ifnJBkuO/bfPvTH0./zUl2kwzjvtnCtgw3ba7O',
            'name'          =>'Admin - Atop'
        ]);
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
