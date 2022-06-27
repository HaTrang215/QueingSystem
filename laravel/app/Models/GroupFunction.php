<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class GroupFunction extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'group_function';
    protected $fillable = [
        'id_group',
        'name_group_en',
        'name_group_vi'
    ];
}
