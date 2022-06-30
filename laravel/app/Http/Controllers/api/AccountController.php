<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;

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
        $role=DB::table('role')->get();
        return response()->json([
            'status'=> 200,
            'account'=>$account,
            'role'=>$role,
        ]);
    }
}
