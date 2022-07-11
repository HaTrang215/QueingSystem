<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Number_supply;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;
use Carbon\Carbon;

class SerialNumberController extends Controller
{
    public function index(){
        $serial_number=DB::table('number_supply')
                            ->leftjoin ('service', 'number_supply.id_service','=','service.id_service')
                            ->orderBy('start_date', 'DESC')
                            ->get();
        $type_equipment=DB::table('equipment')
                            ->leftjoin ('type_equipment', 'type_equipment.id_type','=','equipment.id_type')
                            ->get();
        $min_date=DB::table('number_supply')->min('start_date');
        $service=DB::table('service')->get();
        $type=DB::table('type_equipment')->get();
        $count= count( $serial_number);
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
            'count'=>$count,

        ]);
    }

    public function detail($id){
        $number= DB::table('number_supply')
                    ->where('id_number_supply', '=', $id)
                    ->leftjoin('service', 'service.id_service', '=', 'number_supply.id_service')
                    ->leftjoin('equipment', 'number_supply.id_equipment', '=', 'equipment.id_equipment')
                    ->get();
        if($number){
            foreach ($number as $val) {
                $val->startdate=date("d/m/Y", strtotime($val->start_date));
                $val->expirydate=date("d/m/Y", strtotime($val->expiry_date));
                $val->starttime=date("H:i", strtotime($val->start_time));
                $val->expirytime=date("H:i", strtotime($val->expiry_time));
            }
            return response()->json([
                'status'=> 200,
                'number'=>$number,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'messenger'=>'Số được cấp không tồn tại'
            ]);
        }
    }

    public function edit(){
        if (isset($_SERVER)){
            if(isset($_SERVER["HTTP_X_FORWARDED_FOR"])){
            $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
            if(strpos($ip,",")){
                $exp_ip = explode(",",$ip);
                $ip = $exp_ip[0];
            }
            }else if(isset($_SERVER["HTTP_CLIENT_IP"])){
                $ip = $_SERVER["HTTP_CLIENT_IP"];
            }else{
                $ip = $_SERVER["REMOTE_ADDR"];
            }
        }else{
            if(getenv('HTTP_X_FORWARDED_FOR')){
                $ip = getenv('HTTP_X_FORWARDED_FOR');
            if(strpos($ip,",")){
                $exp_ip=explode(",",$ip);
                $ip = $exp_ip[0];
            }
            }else if(getenv('HTTP_CLIENT_IP')){
                $ip = getenv('HTTP_CLIENT_IP');
            }else {
                $ip = getenv('REMOTE_ADDR');
            }
        }
        $service= DB::table('services')
                    ->leftjoin('service', 'service.id_service','=','services.id_service')
                    ->leftjoin('equipment', 'equipment.id_equipment','=','services.id_equipment')
                    ->get();
        $data=[];
        $count=0;
        $id_equipment='';
        foreach($service as $val){
            if($val->address_IP === $ip){
                $data[$count] = $val;
                $count=$count+1;
            }
            if($id_equipment !== $val->id_equipment){
                $id_equipment=$val->id_equipment;
            }
        }
        if($service){
            return response()->json([
                'status'=> 200,
                'service'=>$data,
                'id_equipment'=>$id_equipment,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'messenger'=>'Dịch vụ này không tồn tại'
            ]);
        }
    }

    public function add(Request $req){
        if( $req->service==='all'){
            return response()->json([
                'status'=>400,
                'messenger'=>"Yêu cầu chọn phòng khám"
            ]);
        }else{
            $today = Carbon::now();
            $date =date_format($today,"Y-m-d");
            $time = date_format($today,"H:i:s");
            $service= DB::table('service')
                        ->where('service.id_service', '=', $req->service)
                        ->leftjoin('detail_service', 'service.id_service','=','detail_service.id_service')
                        ->where('detail_service.end_date', '=', null)
                        ->get();
            $number_supply = '';

            if($service){
                foreach ($service as $val){
                if($val->reset_daily === 1){
                    $number= DB::table('number_supply')->where('start_date','=',$date)->where('id_service','=',$req->service)->count();
                    $prefit='';
                    $surfit='';
                    $int = 0;
                    if($val->auto_increate ===1){
                        $int=(int)$val->start+$number;
                    }
                    if($val->prefix !== '0'){
                        $prefit=$val->prefix;
                    }
                    if($service[0]->surfix !== '0'){
                        $surfit=$val->surfix;
                    }
                    $int=(string)$int;
                    $count=strlen($int);
                    if($count === 1){
                        $int='000'.$int;
                    }else if($count === 2){
                        $int='00'.$int;
                    }else if($count === 3){
                        $int='0'.$int;
                    }else{
                        $int=$int;
                    }
                    $number_supply= $prefit.$int.$surfit;
                }else{
                    $number= DB::table('number_supply')->where('id_service','=',$req->service)->count();
                    $prefit='';
                    $surfit='';
                    $int = 0;
                    if($number > $val->end){
                        $number=$number-$val->end;
                    }
                    if($val->auto_increate ===1){
                        $int=(int)$val->start+$number;
                    }
                    if($val->prefix !== '0'){
                        $prefit=$val->prefix;
                    }
                    if($val->surfix !== '0'){
                        $surfit=$val->surfix;
                    }
                    $int=(string)$int;
                    $count=strlen($int);
                    if($count === 1){
                        $int='000'.$int;
                    }else if($count === 2){
                        $int='00'.$int;
                    }else if($count === 3){
                        $int='0'.$int;
                    }else{
                        $int=$int;
                    }
                    $number_supply= $prefit.$int.$surfit;
                }
            }
                $add_number= new Number_supply;
                $add_number->number_supply=$number_supply;
                $add_number->id_service=$req->service;
                $add_number->id_equipment=$req->equipment;
                $add_number->start_time=$time;
                $add_number->start_date=$date;
                $add_number->expiry_date=$date;
                $add_number->created_at=$today;
                $add_number->updated_at=$today;
                $add_number->save();

                $data=DB::table('number_supply')
                        ->leftjoin('equipment', 'equipment.id_equipment', '=', 'number_supply.id_equipment')
                        ->where('number_supply.number_supply', '=', $number_supply)
                        ->get();
                foreach($data as $val){
                    $val->startdate=date("d/m/Y", strtotime($val->start_date));
                    $val->expirydate=date("d/m/Y", strtotime($val->expiry_date));
                    $val->starttime=date("H:i", strtotime($val->start_time));
                    $val->expirytime=date("H:i", strtotime($val->expiry_time));
                }
                return response()->json([
                    'status'=>200,
                    'messenger'=>'Thêm thành công',
                    'data'=>$data,
                    'number'=>$number_supply
                ]);
            }else{
                return response()->json([
                    'status'=>400,
                    'messenger'=>"Dịch vụ này không còn hoạt động"
                ]);
            }
        }
    }
}
