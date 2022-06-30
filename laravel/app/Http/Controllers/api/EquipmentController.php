<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Equipment;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;

class EquipmentController extends Controller
{
    public function index(){
        $equipment = Equipment::all();
        $service = DB::table('service')
                        ->leftjoin ('services', 'service.id_service','=','services.id_service')
                        ->select('services.id_equipment', 'service.service_name')
                        ->get();

        $i = count($equipment);
        for ($j=0; $j < $i; $j++){
            $id = $equipment[$j]['id_equipment'];
            $ip = $equipment[$j]['address_IP'];
            $temporary='';
           foreach ($service as $s){
                $t=$s->id_equipment;
                $n=$s->service_name;
                if($t == $id){
                    $temporary = $temporary.$n.', ';
                }
                $ping = exec("ping -n 1 $ip", $output,$status);
                $equipment[$j]['status_connect']=$status;
            }
            $equipment[$j]['service_name'] = $temporary;
        }
        return response()->json([
            'status'=> 200,
            'equipment'=>$equipment,
        ]);
    }

}
