<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetController;

Route::post('login', [AuthController::class, 'login']);

Route::post('forgetpassword', [AuthController::class, 'forgetpassword']);

Route::post('resetpassword', [ResetController::class, 'resetpassword']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

