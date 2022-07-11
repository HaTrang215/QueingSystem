<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Detail_Service;
use App\Models\Diary;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;
use Carbon\Carbon;

class ServiceController extends Controller
{
    public function index(){
        $service = DB::table('service')->get();
        $mindate = DB::table('detail_service')->min('create_date');
        foreach ($service as $value) {
            $detail=Detail_Service::where('id_service', '=',$value->id_service)
                            ->orderBy('id_detail_service', 'DESC')
                            ->first();
            $num=0;
            if($detail->end_date===null){
                $num=1;
            };
            $value->status_active=$num;
            $value->create_date=$detail->create_date;
        }
        $count= count($service);
        return response()->json([
            'status'=> 200,
            'service'=>$service,
            'mindate'=>$mindate,
            'num'=>$count
        ]);
    }
    public function add(Request $req){
        $validator = Validator::make($req->all(),[
            'id_service'=>'required',
            'service_name'=>'required',
            'describe'=>'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'messenger'=>"Là trường thông tin bắt buộc"
            ]);
        }else{
            $today = Carbon::now();
            $find = DB::table('service')->where('id_service','=',$req->id_service)->first();
            if(!$find){
                $service= new Service;
                $service->id = 0;
                $service->id_service = $req->id_service;
                $service->service_name = $req->service_name;
                $service->describe = $req->describe;
                $service->created_at= $today;
                $service->updated_at= $today;
                $service->save();

                $id_detail_service = DB::table('detail_service')->count();
                $date =date_format($today,"Y-m-d");
                $ds=new Detail_Service;
                $ds->id = 0;
                $ds->id_detail_service = $id_detail_service+1;
                $ds->id_service = $req->id_service;
                $ds->auto_increate = $req->auto_increate;
                $ds->start = $req->start;
                $ds->end = $req->end;
                $ds->prefix = $req->prefix;
                $ds->surfix = $req->surfix;
                $ds->reset_daily = $req->reset_daily;
                $ds->create_date = $date;
                $ds->end_date = null;
                $ds->created_at= $today;
                $ds->updated_at= $today;
                $ds->save();

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
                $Diary->perform_operation = 'Thêm dịch vụ '.$req->service_name;
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
                    'messenger'=>'Mã dịch vụ này đã tồn tại'
                ]);
            }
        }
    }

    public function edit($id){
        $service= DB::table('service')
                    ->where('id_service', '=', $id)
                    ->get();
        if($service){
            return response()->json([
                'status'=> 200,
                'service'=>$service,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'messenger'=>'Dịch vụ này không tồn tại'
            ]);
        }
    }

    public function update(Request $req){
        $validator = Validator::make($req->all(),[
            'id_service'=>'required',
            'service_name'=>'required',
            'describe'=>'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'messenger'=>"Là trường thông tin bắt buộc"
            ]);
        }else{
            $today = Carbon::now();
            $date =date_format($today,"Y-m-d");
            $service = Service::where('id_service','=',$req->id_service)->first();
            if($service){
                $service->service_name = $req->service_name;
                $service->describe = $req->describe;
                $service->updated_at= $today;
                $service->save();

                $detail = Detail_Service::where('id_service', '=',$req->id_service)
                            ->orderBy('id_detail_service', 'DESC')
                            ->first();
                if($detail->end_date===null){
                    $detail->end_date = $date;
                    $detail->save();
                }

                $id_detail_service = DB::table('detail_service')->count();

                $ds=new Detail_Service;
                $ds->id_detail_service = $id_detail_service+1;
                $ds->id_service = $req->id_service;
                $ds->auto_increate = $req->auto_increate;
                $ds->start = $req->start;
                $ds->end = $req->end;
                $ds->prefix = $req->prefix;
                $ds->surfix = $req->surfix;
                $ds->reset_daily = $req->reset_daily;
                $ds->create_date = $date;
                $ds->end_date = null;
                $ds->created_at= $today;
                $ds->updated_at= $today;
                $ds->save();

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
                $Diary->perform_operation = 'Cập nhật dịch vụ '.$req->service_name;
                $Diary->created_at = $today;
                $Diary->updated_at = $today;
                $Diary->save();
                return response()->json([
                    'status'=>200,
                    'messenger'=>'Thêm thành công',
                    'detail'=>$detail,
                    'service'=>$service,
                ]);
            }else{
                return response()->json([
                    'status'=>401,
                    'messenger'=>'Mã dịch vụ này không đã tồn tại'
                ]);
            }
        }
    }

    public function detail($id){
        $service = DB::table('service')->where('id_service','=',$id)->get();
        $mindate = DB::table('number_supply')->where('id_service','=',$id)->min('start_date');
        foreach ($service as $value) {
            $detail=Detail_Service::where('id_service', '=',$value->id_service)
                            ->orderBy('id_detail_service', 'DESC')
                            ->first();
            $value->auto_increate=$detail->auto_increate;
            $value->start=$detail->start;
            $value->end=$detail->end;
            $value->prefix=$detail->prefix;
            $value->surfix=$detail->surfix;
            $value->reset_daily=$detail->reset_daily;
        }
        $number = DB::table('number_supply')->where('id_service','=',$id)->get();
        $count= count($number);
        return response()->json([
            'status'=> 200,
            'service'=>$service,
            'mindate'=>$mindate,
            'number'=>$number,
            'count'=>$count
        ]);
    }

}
