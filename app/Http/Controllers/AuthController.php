<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginFormRequest;
use App\User;
use Carbon\Carbon;
use JWTAuth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    //
    public function login(LoginFormRequest $request){
        try {
            $token = JWTAuth::attempt($request->only('email', 'password'), [
                'exp' => Carbon::now()->addWeek()->timestamp,
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not authenticate',
            ], 500);
        }

        if (!$token) {
            return response()->json([
                'error' => 'Could not authenticate',
            ], 401);
        } else {
            $data = [];
            $data['name'] = $request->user()->name;

            return response()->json([
                'data' => $data,
                'token' => $token
            ]);
        }
    }
}
