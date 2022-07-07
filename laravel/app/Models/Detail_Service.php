<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_Service extends Model
{
    use HasFactory;
    protected $table = 'detail_service';
    protected $fillable = [
        'id_detail_service',
        'id_service',
        'auto_increate',
        'start',
        'end',
        'prefix',
        'surfix',
        'reset_daily',
        'create_date',
        'end_date',
        'created_at',
        'updated_at'
    ];
    protected $primaryKey = 'id';
}
