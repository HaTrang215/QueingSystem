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
use App\Http\Controllers\api\AddEquipmentController;
use App\Http\Controllers\api\RoleController;
use App\Http\Controllers\api\AccountController;
use App\Http\Controllers\api\DiaryController;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::post('forgetpassword', [AuthController::class, 'forgetpassword']);

Route::post('resetpassword', [ResetController::class, 'resetpassword']);

Route::post('loaduser', [UserController::class, 'loaduser']);

Route::post('auth', [UserController::class, 'auth']);
//Type-equipment


//Account
Route::post('account', [UserController::class, 'account']);
Route::post('upload-image', [UserController::class, 'uploadimg']);

//Dashboard
Route::get('dashboard', [DashboardController::class, 'index']);

//Equipment
Route::get('list-equipment', [EquipmentController::class, 'index']);
Route::get('list-type-equipment', [EquipmentController::class, 'store']);
Route::post('add-equipment', [EquipmentController::class, 'add']);
Route::get('edit-equipment/{id}', [EquipmentController::class, 'edit']);
Route::post('update-equipment', [EquipmentController::class, 'update']);
Route::get('detail-equipment/{id}', [EquipmentController::class, 'detail']);

//Service
Route::get('list-service', [ServiceController::class, 'index']);
Route::post('add-service', [ServiceController::class, 'add']);
Route::get('edit-service/{id}', [ServiceController::class, 'edit']);
Route::post('update-service', [ServiceController::class, 'update']);
Route::get('detail-service/{id}', [ServiceController::class, 'detail']);

//Serial-number
Route::get('list-serial-number', [SerialNumberController::class, 'index']);
Route::get('detail-serial-number/{id}', [SerialNumberController::class, 'detail']);

//Role-management
Route::get('list-role-management', [RoleController::class, 'index']);

//Account-management
Route::get('list-account-managerment', [AccountController::class, 'index']);
Route::get('list-role', [AccountController::class, 'store']);
Route::post('add-account', [AccountController::class, 'add']);
Route::get('edit-account/{id}', [AccountController::class, 'edit']);
Route::post('update-account', [AccountController::class, 'update']);

//Diary
Route::get('diary', [DiaryController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

