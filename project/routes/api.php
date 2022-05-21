<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    //왜 여기서 이렇게 사용을 해주는지 잘 모르겠다 기본적으로 그냥 post로 하면 되는거 아닌가? 왜 굳이 이렇게?
    Route::get('/user',function(Request $request) {
        return $request->user();
    });

    Route::post('/logout',[AuthController::class,'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
