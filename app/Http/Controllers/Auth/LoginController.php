<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */
    
    use AuthenticatesUsers;
    
    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    
    public function login(Request $request)
    {
        $user = User::where('email', '=', $request->input('email'))->first();
        
        if ($user) {
            $banCheck = $user->user_profile()->where('banned', '1')->first();
            if ($banCheck) {
                return $this->sendFailedLoginResponse($request);
            }
            
            if (Hash::check($request->input('password'), $user->password)) {
                Auth::login($user, $request->has('remember'));
                
                return $this->redirectPath();
            }
        }
        
        Auth::logout();
        
        return $this->sendFailedLoginResponse($request);
    }
}
