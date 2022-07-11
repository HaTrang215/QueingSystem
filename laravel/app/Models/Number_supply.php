<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Number_supply extends Model
{
    use HasFactory;
    protected $table = 'number_supply';
    protected $fillable = [
        'id_number_supply',
        'number_supply',
        'patient_name',
        'patient_phone',
        'id_service',
        'id_equipment',
        'start_time',
        'start_date',
        'used_time',
        'used_date',
        'expiry_time',
        'expiry_date',
        'status_active',
        'created_at',
        'updated_at'
    ];
    protected $primaryKey = 'id_number_supply';
}
