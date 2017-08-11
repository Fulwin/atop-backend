<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Models\Site;

class CreateBasicSite extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $site = New Site();
        // $data = [
        //   'title' => 'ATOP Corporation',
        //   'keyword' => 'ATOP Corporation',
        //   'description' => 'ATOP Corporation',
        //   'author' => 'www.webmelbourne.com',
        //   'copyright' => 'ATOP Corporation',
        //   'info' => 'ATOP Corporation'
        // ];
        $site->title = 'ATOP Corporation';
        $site->keyword = 'ATOP Corporation';
        $site->description = 'ATOP Corporation';
        $site->author = 'www.webmelbourne.com';
        $site->copyright = 'ATOP Corporation';
        $site->info = 'ATOP Corporation';
        $site->save();
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
