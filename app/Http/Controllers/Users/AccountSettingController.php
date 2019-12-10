<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreditCardRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AccountSettingController extends Controller
{
    /**
     * Account settings page loaded.
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $page_title = 'Account setting';
        
        return view('users.account-settings', compact('page_title'));
    }
    
    /**
     * Account Profile Photo Upload
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeProfilePhoto(Request $request)
    {
        $tempFile = $request->file('img');
        
        $extension = $tempFile->getClientOriginalExtension();
        $f_name = auth()->user()->id . '.' . $extension;
        
        Storage::PutFileAs(config('site.users-path') . 'avatars', $tempFile, $f_name, ['visibility' => 'public']);
        
        auth()->user()->user_profile()->update(['image_ext' => $extension]);
        
        return response()->json([
            'result' => 'success'
        ]);
    }
    
    /**
     * Save Account Settings Data.
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function saveSettings(Request $request)
    {
        $page_title = 'Success setting';
        
        $user = auth()->user();
        $user->name = $request->input('name');
        $user->save();
        
        session()->flash('success', 'Account settings data successfully updated.');
        
        $success_data = [
            'action_name' => 'Account Setting',
            'msg'         => 'Account Setting',
            'url'         => secure_routing(route('account-settings'))
        ];
        
        return response()->view('users.success-blank', compact('success_data', 'page_title'));
    }
    
    /**
     * Change Password Of Account Settings
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function changePasswords()
    {
        $page_title = 'Change password';
        
        return view('users.account-password', compact('page_title'));
    }
    
    /**
     * Save the changed password.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function savePasswords(Request $request)
    {
        $current_password = $request->input('current_password');
        if (Hash::check($current_password, auth()->user()->getAuthPassword())) {
            $this->validate($request, [
                'password' => 'required|string|min:6|confirmed'
            ]);
            
            $user = auth()->user();
            $user->password = Hash::make($request->input('password'));
            $user->save();
            
            $page_title = 'Success password';
            session()->flash('success', 'Password changed successfully.');
            $success_data = [
                'action_name' => 'Change Password',
                'msg'         => 'Password',
                'url'         => secure_routing(route('account-settings'))
            ];
            
            return response()->view('users.success-blank', compact('success_data', 'page_title'));
        } else {
            return back()->withErrors('Incorrect Current Password.');
        }
    }
    
    public function changeCreditCard()
    {
        $page_title = 'Change credit card';
        
        $profile = auth()->user()->user_profile;
        $data = [
            'credit_card_number'       => $profile->credit_card_number,
            'credit_card_expire_month' => $profile->credit_card_expire_on != '0000-00-00' ? date('m', strtotime($profile->credit_card_expire_on)) : '',
            'credit_card_expire_year'  => $profile->credit_card_expire_on != '0000-00-00' ? date('y', strtotime($profile->credit_card_expire_on)) : '',
            'credit_card_name'         => $profile->credit_card_name,
            'credit_card_cvv'          => $profile->credit_card_cvv
        ];
        
        return view('users.account-credit-card', compact('page_title', 'data'));
    }
    
    public function saveCreditCard(CreditCardRequest $request)
    {
        $request->validated();
        auth()->user()->user_profile()->update([
            'credit_card_number'    => $request->get('credit_card_number'),
            'credit_card_expire_on' => '20' . $request->get('credit_card_expire_year') . '-' . $request->get('credit_card_expire_month') . '-28',
            'credit_card_name'      => $request->get('credit_card_name'),
            'credit_card_cvv'       => $request->get('credit_card_cvv')
        ]);
        $page_title = 'Success credit card';
        session()->flash('success', 'Credit card changed successfully.');
        $success_data = [
            'action_name' => 'Change Credit Card',
            'msg'         => 'Credit Card',
            'url'         => secure_routing(route('account-settings'))
        ];
        
        return response()->view('users.success-blank', compact('success_data', 'page_title'));
    }
}
