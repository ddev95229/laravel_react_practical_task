<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
     /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);
    
        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 422);
        }
    
        $user = User::where('email', $request->email)->first();
        
        $accessToken = $user->createToken('access_token', ['*'], now()->addSeconds(config('sanctum.access_token_expiration')))->plainTextToken;
    
        return response()->json([
            'user' => $user,
            'token' => $accessToken,
            'token_expiration' => config('sanctum.access_token_expiration'),
        ], 200);
    }

}
