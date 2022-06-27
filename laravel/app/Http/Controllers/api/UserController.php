<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\GroupFunction;
use App\Models\Responsible;
use Illuminate\Support\Facades\Hash;
use Validator;

class UserController extends Controller
{
    public function loaduser(Request $req){
        $user = User::find($req->id);
        if ($user){
            return response()->json([
                'status'=> 200,
                'user'=>$user,
            ]);
        }
            return response()->json([
                'status'=> 401,
                'messenger'=>'Không tìm thấy người dùng'
        ]);
    }

    public function auth(Request $req){
        $user = User::find($req->id);
        if ($user){
            $group = GroupFunction::where('name_group_en', $req->group)->first();
            $total = Responsible::where('id_role', $user->id_role)->where('id_group', $group->id_group)->sum('id_function');
            $count = Responsible::where('id_role', $user->id_role)->where('id_group', $group->id_group)->count();
            $min = Responsible::where('id_role', $user->id_role)->where('id_group', $group->id_group)->min('id_function');
            return response()->json([
                'status'=> 200,
                'total'=>$total,
                'count'=>$count,
                'min'=>$min,
            ]);
        }
            return response()->json([
                'status'=> 401,
                'messenger'=>'Không tìm thấy người dùng'
        ]);
    }
}
