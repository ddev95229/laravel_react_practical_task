<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Task;
use App\Models\TaskList;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $taskLists = TaskList::all();


        foreach ($taskLists as $taskList) {
            Task::create([
                'task_list_id' => $taskList->id,
                'title' => 'Complete project',
                'description' => 'Finish the current project by the end of the week',
                'completed' => false,
            ]);


            Task::create([
                'task_list_id' => $taskList->id,
                'title' => 'Buy groceries',
                'description' => 'Get milk, eggs, and bread',
                'completed' => true,
            ]);


            Task::create([
                'task_list_id' => $taskList->id,
                'title' => 'Schedule dentist appointment',
                'description' => null,
                'completed' => false,
            ]);
        }
    }
}
