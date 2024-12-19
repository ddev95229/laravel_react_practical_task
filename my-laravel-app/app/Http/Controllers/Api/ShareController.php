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
            'username' => 'required|exists:users,username',
            'permission' => 'required|in:view,edit',
        ]);


        $user = User::where('username', $validated['username'])->first();


        $taskList->sharedUsers()->syncWithoutDetaching([
            $user->id => ['permission' => $validated['permission']]
        ]);


        return response()->json(['message' => 'Task list shared successfully']);
    }


    public function sharedLists()
    {
        $sharedLists = auth()->user()->sharedTaskLists;
        return response()->json($sharedLists);
    }
}
