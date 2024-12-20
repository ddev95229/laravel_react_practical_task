<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\Task;
use App\Models\TaskList;

class ShareController extends Controller
{
    public function share(Request $request, TaskList $taskList)
    {

        $validated = $request->validate([
            'username' => 'required|exists:users,name',
            'permission' => 'required|in:view,edit',
        ]);


        $user = User::where('name', $validated['username'])->first();


        $taskList->sharedUsers()->syncWithoutDetaching([
            $user->id => ['permission' => $validated['permission']]
        ]);


        return response()->json(['message' => 'Task list shared successfully']);
    }


    public function sharedLists()
    {
        $sharedLists = auth()->user()->sharedTaskLists;
        $sharedLists->load('tasks');
        return response()->json($sharedLists);
    }
}
