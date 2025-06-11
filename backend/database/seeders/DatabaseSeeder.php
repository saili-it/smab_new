<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'hamid',
            'email' => 'hamid@gmail.com',
            'tel' => '1234567890',
            'address' => '123 Test Street, Test City',
            'password' => bcrypt('123456789'),
        ]);
    }
}
