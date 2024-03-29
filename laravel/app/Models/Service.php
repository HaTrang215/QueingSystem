<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $table = 'service';
    protected $fillable = [
        'id_service',
        'service_name',
        'describe',
        'created_at',
        'updated_at'
    ];
    protected $primaryKey = 'id';
}
