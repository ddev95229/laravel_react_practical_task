<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\TaskList;
use App\Models\User;

class TaskListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();


        foreach ($users as $user) {
            TaskList::create([
                'user_id' => $user->id,
                'name' => 'Personal Tasks',
            ]);


            TaskList::create([
                'user_id' => $user->id,
                'name' => 'Work Tasks',
            ]);
        }
    }
}
