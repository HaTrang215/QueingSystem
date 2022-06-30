<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Equipment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;

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
                    $equipment = DB::table('equipment')
                                ->leftjoin ('users', 'equipment.id_user','=','users.id')
                                ->where('users.username', $req->username)->where ('equipment.address_IP', $ip)->where('users.password',$req->password)
                                ->select(['id_type','id_equipment'])
                                ->get();
                    $count = count($equipment);
                    if($count!==1){
                        return response()->json([
                            'status'=>401,
                            'messenger'=>'Sai mật khẩu, tên đăng nhập hoặc máy này không thể kết nối'
                        ]);
                    }else if($count === 1){
                        return response()->json([
                            'status'=>200,
                            'object'=> 1,
                            'equipment'=>$equipment,
                            'messenger'=>'Đăng nhập thành công',
                        ]);
                    }
            }else{
                if($user->status_login===0){
                    $token = $user->createToken($user->email.'_Token')->plainTextToken;
                    $update = User::find($user->id);
                    if($update){
                        $update->status_login = 1;
                        $update->save();
                        return response()->json([
                            'status'=>200,
                            'object'=> 0,
                            'id'=>$user->id,
                            'messenger'=>'Cập nhật thành công'
                        ]);
                    }else{
                        return response()->json([
                            'status'=>401,
                            'messenger'=>'Cập nhật trạng thái không thành công'
                        ]);
                    }
                }else{
                    return response()->json([
                        'status'=>401,
                        'messenger'=>'Người dùng này đã đăng nhập.'
                    ]);
                }

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

    public function logout(Request $req){
        $user = User::find($req->id);
        if($user){
            $user->status_login = 0;
            $user->save();
            return response()->json([
                'status'=>200,
                'messenger'=>'Cập nhật thành công'
            ]);
        }else{
            return response()->json([
                'status'=>401,
                'messenger'=>'Cập nhật trạng thái không thành công'
            ]);
        }
    }

}
