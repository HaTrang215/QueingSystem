<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type_Equipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_type',
        'type_name',
    ];
}
