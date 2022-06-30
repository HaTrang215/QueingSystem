<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Equipment;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;

class DashboardController extends Controller
{
    public function index(){
        $equipment = Equipment::all();
        $service = DB::table('service')->get();
        $number =DB::table('number_supply')->get();

        return response()->json([
            'status'=> 200,
            'equipment'=>$equipment,
            'service'=>$service,
            'number'=>$number
        ]);
    }

}
