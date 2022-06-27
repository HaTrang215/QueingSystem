<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\EquipmentController;
use App\Http\Controllers\api\ServiceController;
use App\Http\Controllers\api\SerialNumberController;
use App\Http\Controllers\api\TypeEquipmentController;

Route::post('login', [AuthController::class, 'login']);

Route::post('forgetpassword', [AuthController::class, 'forgetpassword']);

Route::post('resetpassword', [ResetController::class, 'resetpassword']);

Route::post('loaduser', [UserController::class, 'loaduser']);

Route::post('auth', [UserController::class, 'auth']);

//Equipment
Route::get('list-equipment', [EquipmentController::class, 'index']);

//Service
Route::get('list-service', [ServiceController::class, 'index']);

//Serial-number
Route::get('list-serial-number', [SerialNumberController::class, 'index']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

