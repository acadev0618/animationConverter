<?php


namespace App\Http\Controllers;


use App\User;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {
        if (auth()->check()) {
            if (isSupperAdmin()) {
                $mode = 'admin_login';
                
                return view('admin.index', compact('mode'));
            } else {
                return redirect('/dashboard', 302, [], config('site.ssl_tf'));
            }
        } else {
            $mode = 'user';
            
            return view('layouts.app', compact('mode'));
        }
    }
    
    public function login()
    {
        if (auth()->check()) {
            session()->put('login_as_user', '');
            
            auth()->logout();
        }
        $mode = 'user';
        
        return view('auth.login', compact('mode'));
    }
    
    public function adminLoginAsUser(Request $request)
    {
        $user = User::find($request->route()->parameter('user_id'));
        
        $request->session()->put('login_as_user', 'admin');
        
        auth()->login($user);
        
        return redirect('/', 302, [], config('site.ssl_tf'));
    }
    
    public function userLoginAsAdmin()
    {
        $user = User::where('email', '=', getConfig('admin_email'))->first();
        
        session()->put('login_as_user', '');
        
        auth()->login($user);
        
        return redirect('/', 302, [], config('site.ssl_tf'));
    }
}
