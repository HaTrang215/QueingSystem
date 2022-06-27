<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;

class SerialNumberController extends Controller
{
    public function index(){
        $serial_number=DB::table('number_supply')
                            ->leftjoin ('service', 'number_supply.id_service','=','service.id_service')
                            ->get();
        $type_equipment=DB::table('equipment')
                            ->leftjoin ('type_equipment', 'type_equipment.id_type','=','equipment.id_type')
                            ->get();
        $min_date=DB::table('number_supply')->min('start_date');
        $service=DB::table('service')->get();
        $type=DB::table('type_equipment')->get();
        foreach($serial_number as $val){
            foreach($type_equipment as $t){
                if($val->id_equipment===$t->id_equipment){
                    $val->type_name_vi=$t->type_name_vi;
                }
            }
            $val->startdate=date("d/m/Y", strtotime($val->start_date));
            $val->expirydate=date("d/m/Y", strtotime($val->expiry_date));
            $val->starttime=date("H:i", strtotime($val->start_time));
            $val->expirytime=date("H:i", strtotime($val->expiry_time));
        }
        return response()->json([
            'status'=> 200,
            'messenger'=>'Thành công',
            'min_date'=>$min_date,
            'serial_number'=>$serial_number,
            'type_equiment'=>$type,
            'service'=>$service,
        ]);
    }
}
