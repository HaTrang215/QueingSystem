<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Diary extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'diary';
    protected $fillable = [
        'id_diary',
        'id_user',
        'perform_time',
        'perform_date',
        'address_IP',
        'perform_operation',
    ];
}
