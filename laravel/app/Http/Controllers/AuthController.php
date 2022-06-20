<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Equipment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Validator;

class AuthController extends Controller
{
    public function login(Request $req){
        $validator = Validator::make($req->all(),[
            'username'=>'required',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>401,
                'messenger'=>'Mật khẩu và tên đăng nhập là bắt buộc'
            ]);
        }else{
            $user = User::where('username', $req->username)->first();

            if (! $user || ! Hash::check($req->password, $user->password)) {
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
                    $equipment = Equipment::where('username', $req->username)->where ('address_IP', $ip)->where('password',$req->password)->first();
                    if(! $equipment){
                        return response()->json([
                            'status'=>401,
                            'messenger'=>'Sai mật khẩu hoặc tên đăng nhập'
                        ]);
                    }else{
                        return response()->json([
                            'status'=>200,
                            'object'=> 1,
                            'type'=>$equipment->id_type,
                            'messenger'=>'Đăng nhập thành công',
                        ]);
                    }
            }else{
                $token = $user->createToken($user->email.'_Token')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'object'=> 0,
                    'username'=>$user->username,
                    'token'=>$token,
                    'messenger'=>'Login successfully'
                ]);
            }
        }
    }
    public function forgetpassword(Request $req){
        $validator = Validator::make($req->all(),[
            'email'=>'required',
        ]);

        if ($validator->fails()){
            return response()->json([
                'status'=>401,
                'messenger'=>'Email là bắt buộc',
            ]);
        }else{
            $user = User::where('email', $req->email)->first();

            if(! $user){
                return response()->json([
                    'status'=>401,
                    'messenger'=>'Email không tồn tại',
                ]);
            }else{
                return response()->json([
                    'status'=>200,
                    'id'=>$user->id,
                    'messenger'=>'Thành công',
                ]);
            }
        }
    }

}
