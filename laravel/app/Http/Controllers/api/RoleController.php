<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;

class RoleController extends Controller
{
    public function index(){
        $user = DB::table('users')
                        ->select(DB::raw('count(*) as SL'),'id_role')
                        ->groupBy('id_role');
        $role = DB::table('role as r')
                        ->select('u.SL', 'r.*')
                        ->join(DB::raw('('.$user->toSql().')u'), 'u.id_role', '=', 'r.id_role')
                        ->get();
        return response()->json([
            'status'=> 200,
            'role'=>$role,
        ]);
    }
}
