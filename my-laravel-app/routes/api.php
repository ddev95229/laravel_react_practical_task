<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticatedSessionController;
use App\Http\Controllers\Api\RegisteredUserController;

use App\Http\Controllers\Api\TaskListController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\ShareController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    // Task List routes
    Route::get('task-lists', [TaskListController::class, 'index']);
    Route::post('task-lists', [TaskListController::class, 'store']);
    Route::get('task-lists/{taskList}', [TaskListController::class, 'show']);
    Route::put('task-lists/{taskList}', [TaskListController::class, 'update']);
    Route::delete('task-lists/{taskList}', [TaskListController::class, 'destroy']);


    // Task routes
    Route::get('task-lists/{taskList}/tasks', [TaskController::class, 'index']);
    Route::post('task-lists/{taskList}/tasks', [TaskController::class, 'store']);
    Route::get('tasks/{task}', [TaskController::class, 'show']);
    Route::put('tasks/{task}', [TaskController::class, 'update']);
    Route::delete('tasks/{task}', [TaskController::class, 'destroy']);
    Route::patch('tasks/{task}/toggle', [TaskController::class, 'toggle']);


    // Sharing routes
    Route::post('task-lists/{taskList}/share', [ShareController::class, 'share']);
    Route::get('shared-lists', [ShareController::class, 'sharedLists']);
});
