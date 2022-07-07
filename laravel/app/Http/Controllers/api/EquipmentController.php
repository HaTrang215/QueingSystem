<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Equipment;
use App\Models\User;
use App\Models\Services;
use App\Models\Diary;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;
use Carbon\Carbon;

class EquipmentController extends Controller
{
    public function index(){
        $equipment = Equipment::all();
        $service = DB::table('service')
                        ->leftjoin ('services', 'service.id_service','=','services.id_service')
                        ->select('services.id_equipment', 'service.service_name')
                        ->get();
        $count = count($equipment);
        for ($j=0; $j < $count; $j++){
            $id = $equipment[$j]['id_equipment'];
            $ip1 = $equipment[$j]['address_IP'];
            $temporary='';
           foreach ($service as $s){
                $t=$s->id_equipment;
                $n=$s->service_name;
                if($t === $id){
                    $temporary = $temporary.$n.', ';
                }
            }
            $equipment[$j]['service_name'] = $temporary;
            // $ping = exec("ping -n 1 $ip1", $output,$status);
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
            if($ip === $ip1){
                $equipment[$j]['status_connect']=1;
            }else{
                $equipment[$j]['status_connect']=0;
            };

        }
        return response()->json([
            'status'=> 200,
            'equipment'=>$equipment,
            'count'=>$count,
        ]);
    }

    public function store(){
        $type=DB::table('type_equipment')
                ->get();
        $service=DB::table('service')
                ->get();
        $num=0;
        $data=[];
        foreach ($service as $value) {
            $data[$num]['value']=$value->id_service;
            $data[$num]['label']=$value->service_name;
            $num=$num+1;
        }
        return response()->json([
            'status'=> 200,
            'type'=>$type,
            'service'=>$data,
        ]);
    }

    public function add(Request $req){
        $validator = Validator::make($req->all(),[
            'id_equipment'=>'required',
            'name_equipment'=>'required',
            'address_IP'=>'required',
            'username'=>'required',
            'password'=>'required'
        ]);

        $s=preg_split("/[,]/",$req->service);

        if($validator->fails() || $req->type==='all'|| $req->length ===0){
            return response()->json([
                'status'=>400,
                'messenger'=>"Là trường thông tin bắt buộc"
            ]);
        }else{
            $id = Equipment::where('id_equipment', $req->id_equipment)->first();
            $today = Carbon::now();
            if (!$id) {
                $id_user= DB::table('users')->count();
                $user= new User;
                $user->id = $id_user+1;
                $user->name = 'Thiết bị';
                $user->phone = '';
                $user->avatar = '';
                $user->username = $req->username;
                $user->email = '';
                $user->email_verified_at = null;
                $user->password = $req->password;
                $user->id_role = 0;
                $user->status_active = 1;
                $user->status_login = 0;
                $user->remember_token = null;
                $user->created_at= $today;
                $user->updated_at= $today;
                $user->save();

                $Equipment= new Equipment;
                $Equipment->id_equipment=$req->id_equipment;
                $Equipment->equipment_name=$req->name_equipment;
                $Equipment->address_IP=$req->address_IP;
                $Equipment->status_active=1;
                $Equipment->id_type=$req->type;
                $Equipment->id_user=$id_user+1;
                $Equipment->save();

                for($i=0; $i < count($s); $i++){
                    $service= new Services;
                    $service->id_service = $s[$i];
                    $service->id_equipment =$req->id_equipment;
                    $service->save();
                }
                $n = DB::table('diary')->count();
                $date =date_format($today,"Y-m-d");
                $time = date_format($today,"H:i:s");
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
                $Diary= new Diary;
                $Diary->id_diary = $n+1;
                $Diary->id_user = $req->id_user;
                $Diary->perform_time = $time;
                $Diary->perform_date = $date;
                $Diary->address_IP = $ip;
                $Diary->perform_operation = 'Thêm thông tin thiết bị '.$req->id_equipment;
                $Diary->created_at = $today;
                $Diary->updated_at = $today;
                $Diary->save();
                return response()->json([
                    'status'=>200,
                    'messenger'=>'Thêm thành công',
                ]);
            }else{
                return response()->json([
                    'status'=>401,
                    'messenger'=>'Mã thiết bị này đã tồn tại'
                ]);
            }
        }
    }

    public function edit($id){
        $equipment= DB::table('equipment')
                    ->where('id_equipment', '=', $id)
                    ->leftjoin('users', 'users.id', '=', 'equipment.id_user')
                    ->leftjoin('type_equipment', 'type_equipment.id_type', '=', 'equipment.id_type')
                    ->get();
        $services= DB::table('services')->where('id_equipment', '=', $id)
                    ->leftjoin('service', 'services.id_service', '=', 'service.id_service')
                    ->get();
        if($equipment && $services){

            $data=[];
            $num=0;
            foreach ($services as $value) {
                $data[$num]['value']=$value->id_service;
                $data[$num]['label']=$value->service_name;
                $num=$num+1;
            }

            return response()->json([
                'status'=> 200,
                'equipment'=>$equipment,
                'service'=>$data,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'messenger'=>'Mã thiết bị này đã tồn tại'
            ]);
        }
    }
    public function update(Request $req){
        $validator = Validator::make($req->all(),[
            'id_equipment'=>'required',
            'name_equipment'=>'required',
            'address_IP'=>'required',
            'username'=>'required',
            'password'=>'required'
        ]);
        $s=preg_split("/[,]/",$req->service);
        if($validator->fails() || $req->type==='all'|| $req->length ===0){
            return response()->json([
                'status'=>400,
                'messenger'=>"Là trường thông tin bắt buộc"
            ]);
        }else{
            $today = Carbon::now();
            $user = User::find($req->id);
            if ($user){
                $user->username = $req->username;
                $user->password = $req->password;
                $user->updated_at= $today;
                $user->save();

            $Equipment= Equipment::where('id_equipment', $req->id_equipment)->first();
            if($Equipment){
                $Equipment->equipment_name=$req->name_equipment;
                $Equipment->address_IP=$req->address_IP;
                $Equipment->id_type=$req->type;
                $Equipment->id_user=$req->id;
                $Equipment->updated_at= $today;
                $Equipment->save();

                DB::table('services')->where('id_equipment', '=', $req->id_equipment)->delete();
                for($i=0; $i < count($s); $i++){
                    $service= new Services;
                    $service->id_service = $s[$i];
                    $service->id_equipment =$req->id_equipment;
                    $service->save();
                }
                $n = DB::table('diary')->count();
                $date =date_format($today,"Y-m-d");
                $time = date_format($today,"H:i:s");
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
                $Diary= new Diary;
                $Diary->id_diary = $n+1;
                $Diary->id_user = $req->id_user;
                $Diary->perform_time = $time;
                $Diary->perform_date = $date;
                $Diary->address_IP = $ip;
                $Diary->perform_operation = 'Cập nhật thông tin thiết bị '.$req->id_equipment;
                $Diary->created_at = $today;
                $Diary->updated_at = $today;
                $Diary->save();
                return response()->json([
                    'status'=>200,
                    'messenger'=>'Thêm thành công',
                ]);
            }else{
                return response()->json([
                    'status'=>401,
                    'messenger'=>'Mã thiết bị này đã tồn tại'
                ]);
            }
        }
    }
}
    public function detail($id){
        $equipment= DB::table('equipment')
                    ->where('id_equipment', '=', $id)
                    ->leftjoin('users', 'users.id', '=', 'equipment.id_user')
                    ->leftjoin('type_equipment', 'type_equipment.id_type', '=', 'equipment.id_type')
                    ->get();
        $services= DB::table('services')->where('id_equipment', '=', $id)
                    ->leftjoin('service', 'services.id_service', '=', 'service.id_service')
                    ->get();
        if($equipment && $services){
            $data='';
            foreach ($services as $value) {
                $data=$data.$value->service_name.', ';
            }
            return response()->json([
                'status'=> 200,
                'equipment'=>$equipment,
                'service'=>$data,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'messenger'=>'Mã thiết bị này đã tồn tại'
            ]);
        }
    }
}
