<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
        ]);
        
        $accessToken = $user->createToken('access_token', ['*'], now()->addSeconds(config('sanctum.access_token_expiration')))->plainTextToken;
    
        return response()->json([
            'user' => $user,
            'token' => $accessToken,
            'token_expiration' => config('sanctum.access_token_expiration'),
        ], 201);
    }
}
