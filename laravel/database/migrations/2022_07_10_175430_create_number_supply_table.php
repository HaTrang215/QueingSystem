<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('number_supply', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number_supply');
            $table->string('patient_name');
            $table->string('patient_phone');
            $table->string('patient_email');
            $table->string('id_service');
            $table->integer('id_user');
            $table->integer('id_equipment');
            $table->time('start_time');
            $table->date('start_date');
            $table->time('used_time');
            $table->date('used_date');
            $table->time('expiry_time');
            $table->date('expiry_date');
            $table->integer('status_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('number_supply');
    }
};
