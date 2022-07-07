<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Validator;

class ResetController extends Controller
{
    public function resetpassword(Request $req){
        $validator = Validator::make($req->all(),[
            'password'=>'required|min:8',
            'confirmpassword'=>'required|same:password'
        ],);
        if($validator->fails()){
            return response()->json([
                'messenger'=>$validator->messages(),
            ]);
        }else{
            $user = User::find($req->id);
            if ($user){
                $user->password = Hash::make($req->input('password'));
                // $user->password = $req->input('password');
                $user->save();
                return response()->json([
                    'status'=> 200,
                ]);
            }
                return response()->json([
                    'status'=> 401,
                    'messenger'=>'Không tìm thấy người dùng'
            ]);
        }
    }
}
