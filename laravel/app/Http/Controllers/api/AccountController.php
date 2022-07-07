<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Diary;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;
use Carbon\Carbon;

class AccountController extends Controller
{
    public function index(){
        $account=DB::table('users')
                ->join("role", function($join)
                {
                    $join->on("users.id_role", "=", "role.id_role")
                        ->where("users.id_role",">=",1);
                })
                ->get();
        $count = count($account);
        $role=DB::table('role')->get();
        return response()->json([
            'status'=> 200,
            'account'=>$account,
            'role'=>$role,
            'count'=>$count
        ]);
    }

    public function store(){
        $role=DB::table('role')->get();
        return response()->json([
            'status'=> 200,
            'role'=>$role,
        ]);
    }

    public function add(Request $req){
        $validator = Validator::make($req->all(),[
            'name'=>'required',
            'phone'=>'required',
            'email'=>'required',
            'username'=>'required',
            'password'=>'required',
            'confirm_password'=>'required'
        ]);

        if($validator->fails() || $req->role==='all'|| $req->status_active==='all'){
            return response()->json([
                'status'=>400,
                'messenger'=>"Là trường thông tin bắt buộc"
            ]);
        }else{
            if($req->password === $req->confirm_password){
                $id_user= DB::table('users')->count();
                $today = Carbon::now();
                $user= new User;
                $user->id = $id_user+1;
                $user->name = $req->name;
                $user->phone = $req->phone;
                $user->avatar = '';
                $user->username = $req->username;
                $user->email = $req->email;
                $user->email_verified_at = null;
                $user->password = $req->password;
                $user->id_role = $req->role;
                $user->status_active = $req->status_active;
                $user->status_login = 0;
                $user->remember_token = null;
                $user->created_at= $today;
                $user->updated_at= $today;
                $user->save();
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
                $Diary->perform_operation = 'Thêm thông tin tài khoản của '.$req->name.'-STT là '.$id_user+1;
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
                    'messenger'=>'Nhập lại mật khẩu không chính xác'
                ]);
            }
        }
    }
    public function edit($id){
        $account= DB::table('users')
                    ->where('id', '=', $id)
                    ->leftjoin('role', 'users.id_role', '=', 'role.id_role')
                    ->get();
        if($account){
            $data=[];
            $num=0;
            foreach ($account as $value) {
                $data[$num]['value']=$value->status_active;
                if($value->status_active === 1){
                    $data[$num]['label']='Hoạt động';
                }else{
                    $data[$num]['label']='Ngưng hoạt động';
                }
                $num=$num+1;
            }
            return response()->json([
                'status'=> 200,
                'account'=>$account,
                'data'=>$data,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'messenger'=>'Tài khoản này không tồn tại'
            ]);
        }
    }
    public function update(Request $req){
        $validator = Validator::make($req->all(),[
            'name'=>'required',
            'phone'=>'required',
            'email'=>'required',
            'username'=>'required',
            'password'=>'required',
            'confirm_password'=>'required'
        ]);

        if($validator->fails() || $req->role==='all'|| $req->status_active==='all'){
            return response()->json([
                'status'=>400,
                'messenger'=>"Là trường thông tin bắt buộc"
            ]);
        }else{
            if($req->password === $req->confirm_password){
                $today = Carbon::now();
                $user= User::find($req->id);
                if($user){
                    $user->name = $req->name;
                    $user->phone = $req->phone;
                    $user->username = $req->username;
                    $user->email = $req->email;
                    $user->password = $req->password;
                    $user->id_role = $req->role;
                    $user->status_active = $req->status_active;
                    $user->updated_at= $today;
                    $user->save();

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
                    $Diary->perform_operation = 'Cập nhật thông tin tài khoản của '.$req->name.'-STT là '.$req->id;
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
                        'messenger'=>'Nhập lại mật khẩu không chính xác'
                    ]);
                }
            }
        }
    }
}
