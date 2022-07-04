<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\DashboardController;
use App\Http\Controllers\api\EquipmentController;
use App\Http\Controllers\api\ServiceController;
use App\Http\Controllers\api\SerialNumberController;
use App\Http\Controllers\api\TypeEquipmentController;
use App\Http\Controllers\api\RoleController;
use App\Http\Controllers\api\AccountController;
use App\Http\Controllers\api\DiaryController;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::post('forgetpassword', [AuthController::class, 'forgetpassword']);

Route::post('resetpassword', [ResetController::class, 'resetpassword']);

Route::post('loaduser', [UserController::class, 'loaduser']);

Route::post('auth', [UserController::class, 'auth']);

//Account
Route::post('account', [UserController::class, 'account']);
Route::post('upload-image', [UserController::class, 'uploadimg']);

//Dashboard
Route::get('dashboard', [DashboardController::class, 'index']);

//Equipment
Route::get('list-equipment', [EquipmentController::class, 'index']);

//Service
Route::get('list-service', [ServiceController::class, 'index']);

//Serial-number
Route::get('list-serial-number', [SerialNumberController::class, 'index']);

//Role-management
Route::get('list-role-management', [RoleController::class, 'index']);

//Account-management
Route::get('list-account-managerment', [AccountController::class, 'index']);

//Dỉay
Route::get('diary', [DiaryController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

