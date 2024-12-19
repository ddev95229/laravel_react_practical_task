<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\TaskList;

class TaskController extends Controller
{
    public function index(TaskList $taskList)
    {
        return response()->json($taskList->tasks);
    }


    public function store(Request $request, TaskList $taskList)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);


        $task = $taskList->tasks()->create($validated);
        return response()->json($task, 201);
    }


    public function show(Task $task)
    {
        return response()->json($task);
    }


    public function update(Request $request, Task $task)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);


        $task->update($validated);
        return response()->json($task);
    }


    public function destroy(Task $task)
    {

        $task->delete();
        return response()->json(null, 204);
    }


    public function toggle(Task $task)
    {
        $task->update(['completed' => !$task->completed]);
        return response()->json($task);
    }
}
