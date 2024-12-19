<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\TaskList;


class TaskListController extends Controller
{
    public function index()
    {
        $taskLists = auth()->user()->taskLists ?? [];
        
        if(!empty($taskLists))
        {
            $taskLists->load('tasks');
        }
        
        return response()->json($taskLists);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);


        $taskList = auth()->user()->taskLists()->create($validated);
        return response()->json($taskList, 201);
    }


    public function show(TaskList $taskList)
    {
        return response()->json($taskList->load('tasks'));
    }


    public function update(Request $request, TaskList $taskList)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);


        $taskList->update($validated);
        return response()->json($taskList);
    }


    public function destroy(TaskList $taskList)
    {

        $taskList->delete();
        return response()->json(null, 204);
    }
}
