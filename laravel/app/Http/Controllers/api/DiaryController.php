<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;

class DiaryController extends Controller
{
    public function index(){
        $diary=DB::table('diary')
                ->leftjoin("users","users.id","=","diary.id_user" )
                ->orderBy('id_diary', 'DESC')
                ->get();
        $minDate=DB::table("diary")
                ->min("perform_date");
        $count=count($diary);
        foreach($diary as $d){
            $d->time=date("H:i", strtotime($d->perform_time));
            $d->date=date("d/m/Y", strtotime($d->perform_date));
        }
        return response()->json([
            'status'=> 200,
            'diary'=>$diary,
            "minDate"=>$minDate,
            'count'=>$count
        ]);
    }
}
