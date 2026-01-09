<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// authenticated users can see list products
Route::middleware('auth:api')->get('products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// admins can create/update/delete products
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{product}', [ProductController::class, 'update']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);
});
