<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;

class ServiceController extends Controller
{
    public function index(){
        $service = DB::table('service')
                        ->leftjoin ('detail_service', 'service.id_service','=','detail_service.id_service')
                        ->get();
        $mindate = DB::table('detail_service')->min('create_date');
        foreach ($service as &$value) {
            $num=0;
            if($value->end_date===null){
                $num=1;
            };
            $value->status_active=$num;
        }
        return response()->json([
            'status'=> 200,
            'service'=>$service,
            'mindate'=>$mindate,
            'num'=>$num
        ]);
    }
}
