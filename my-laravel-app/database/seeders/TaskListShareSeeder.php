<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\TaskList;
use App\Models\User;


class TaskListShareSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        TaskList::all()->each(function ($taskList) use ($users) {
            // Share each task list with 2 random users
            $usersToShare = $users->where('id', '!=', $taskList->user_id);

            foreach ($usersToShare as $user) {
                $taskList->sharedUsers()->attach($user->id, [
                    'permission' => rand(0, 1) ? 'view' : 'edit',
                ]);
            }
        });
    }
}
