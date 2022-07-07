<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Equipment extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'equipment';
    protected $fillable = [
        'id',
        'id_equipment',
        'equipment_name',
        'address_IP',
        'status_active',
        'id_type',
        'username',
        'password'
    ];
    protected $primaryKey = 'id';
}
