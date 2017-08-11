<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;

class UsersController extends Controller
{
    //
    public function me(){
        return JWTAuth::parseToken()->authenticate();
    }
}
