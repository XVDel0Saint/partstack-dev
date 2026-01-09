<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
    // adjusts user role
    if ($request->user('api') && $request->user('api')->role === 'admin') {
    return $next($request);
    }

    return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
    }
}
