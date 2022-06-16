<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;
    protected $table = 'equipment';
    protected $fillable = [
        'id_equipment',
        'equipment_name',
        'address_IP',
        'status_active',
        'status_connect',
        'id_type',
        'id_user',
        'username',
        'password'
    ];
}
