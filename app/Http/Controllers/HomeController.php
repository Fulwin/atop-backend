<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\View;

class HomeController extends Controller
{
    //
    public function index(){
        return view('welcome');
    }
}
