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
            }
            $equipment[$j]['service_name'] = $temporary;
             if(isset($_SERVER['HTTP_CLIENT_IP']) && $ip == $_SERVER['HTTP_CLIENT_IP']) {
                $equipment[$j]['status_connect'] = 1;
            }elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $ip == $_SERVER['HTTP_X_FORWARDED_FOR']) {
                $equipment[$j]['status_connect'] = 1;
            }elseif(isset($_SERVER['REMOTE_ADDR']) && $ip == $_SERVER['REMOTE_ADDR']){
                $equipment[$j]['status_connect'] = 1;
            }else{
                $equipment[$j]['status_connect'] = 0;
            }
        }
        return response()->json([
            'status'=> 200,
            'equipment'=>$equipment,
        ]);
    }


    // public function selectactive(Request $req){
    //     $equipment = Equipment::where('status_active','=', $req->select)->get();
    //     $service = DB::table('service')
    //                     ->leftjoin ('services', 'service.id_service','=','services.id_service')
    //                     ->select('services.id_equipment', 'service.service_name')
    //                     ->get();

    //     // $i = count($equipment);
    //     // for ($j=0; $j < $i; $j++){
    //     //     $id = $equipment[$j]['id_equipment'];
    //     //     $ip = $equipment[$j]['address_IP'];
    //     //     $temporary='';
    //     //    foreach ($service as $s){
    //     //         $t=$s->id_equipment;
    //     //         $n=$s->service_name;
    //     //         if($t == $id){
    //     //             $temporary = $temporary.$n.', ';
    //     //         }
    //     //     }
    //     //     $equipment[$j]['service_name'] = $temporary;
    //     //      if(isset($_SERVER['HTTP_CLIENT_IP']) && $ip == $_SERVER['HTTP_CLIENT_IP']) {
    //     //         $equipment[$j]['status_connect'] = 1;
    //     //     }elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $ip == $_SERVER['HTTP_X_FORWARDED_FOR']) {
    //     //         $equipment[$j]['status_connect'] = 1;
    //     //     }elseif(isset($_SERVER['REMOTE_ADDR']) && $ip == $_SERVER['REMOTE_ADDR']){
    //     //         $equipment[$j]['status_connect'] = 1;
    //     //     }else{
    //     //         $equipment[$j]['status_connect'] = 0;
    //     //     }
    //     // }
    //     return response()->json([
    //         'status'=> 200,
    //         'equipment'=>$equipment,
    //         // 'count'=>$i,
    //     ]);
    // }
}
