<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Admin\PlansRepository;
use App\Http\Repositories\Admin\UsersRepository;
use App\Http\Repositories\CountriesRepository;
use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    protected $usersRepo;
    protected $countryRepo;
    protected $planRepo;
    
    public function __construct(UsersRepository $usersRepository, CountriesRepository $countriesRepository, PlansRepository $plansRepository)
    {
        $this->usersRepo = $usersRepository;
        $this->countryRepo = $countriesRepository;
        $this->planRepo = $plansRepository;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mode = 'admin_login';
    
        return view('admin.index', compact('mode'));
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $members = $this->usersRepo->getMembers($request);
    
        return response()->json($members);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => 'required|string|min:' . config('auth.password_min') . '|confirmed'
        ], [
            'name.required'      => 'First name is required.'
        ]);
    
        $user = new User();
        $userId = $user->insertGetId([
            'name'      => $request->input('name'),
            'email'     => $request->input('email'),
            'password'  => bcrypt($request->input('password')),
        ]);
    
        $this->usersRepo->create($userId, $request->all());
    
        return response()->json(['success' => 'success']);
    }
    
    /**
     * Display the specified resource.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response('show');
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $user_profile = $user->user_profile()->first();
        $user_plan = $user->user_plan()->first();
    
        $members = [
            'name'         => $user->name,
            'email'        => $user->email,
            'role'         => $user->roles()->first(),
            'company'      => $user_profile->company,
            'address'      => $user_profile->address,
            'city'         => $user_profile->city,
            'postal_code'  => $user_profile->postal_code,
            'state_code'   => $user_profile->state_code,
            'phone'        => $user_profile->phone,
            'subscription' => [
                'name' => $user_plan->status
            ],
            'plan'         => $user_plan->plan()->first()
        ];
    
        if ($user_profile->country !== '') {
            $country = $this->countryRepo->model()->where('code', $user_profile->country)->first();
            $members['country'] = [
                'name'       => $country->name,
                'code'       => $country->code,
                'country_id' => $country->country_id,
            ];
        } else {
            $members['country'] = '';
        }
    
        return response()->json($members);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, User $user)
    {
        $flag = $request->input('flag');
    
        if ($flag == 'banned') {
            $user->user_profile()->update([
                'banned' => 1
            ]);
        } else if ($flag == 'no-ban') {
            $user->user_profile()->update([
                'banned' => 0
            ]);
        } else if ($flag == 'update') {
            $rules = [
                'name'      => 'required|string|max:255',
                'email'     => 'required|string|email|max:255'
            ];
        
            if ($request->input('password') != '') {
                $rules['password'] = 'string|min:' . config('auth.password_min') . '|confirmed';
            }
        
            $this->validate($request, $rules, [
                'name.required'      => 'First name is required.'
            ]);
        
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            if ($request->input('password') != '') {
                $user->password = bcrypt($request->input('password'));
            }
        
            $role = $request->input('role');
        
            $user->roles()->sync($role['id']);
        
            $plan_id = $request->input('plan')['id'];
        
            $plans = $this->planRepo->model()->find($plan_id);
            if ($plans->free_plan == '1') {
                $save_data = [
                    'payment_status' => 'success',
                    'status'         => 'Active',
                    'activated_on'   => date('Y-m-d H:i:s'),
                    'payment_method' => 'Stripe',
                    'free_flag'      => 1
                ];
            } else {
                $current_date = date('Y-m-d H:i:s');
                $save_data = [
                    'free_pack'         => '1',
                    'duration'          => $plans->duration,
                    'duration_schedule' => $plans->duration_schedule,
                    'amount'            => $plans->amount,
                    'payment_status'    => 'success',
                    'status'            => 'Active',
                    'activated_on'      => $current_date,
                    'expiry_on'         => date('Y-m-d H:i:s', strtotime("+" . $plans->duration . " " . $plans->duration_schedule . "s", strtotime($current_date))),
                    'payment_method'    => 'JVZoo',
                    'free_flag'         => 0
                ];
            }
        
            $user->plans()->sync([$plan_id => $save_data]);
            $user->save();
        
            $current_plan = $user->user_plan()->first();
        
            $user->user_profile()->update([
                'company'     => is_null($request->input('company')) ? '' : $request->input('company'),
                'address'     => is_null($request->input('address')) ? '' : $request->input('address'),
                'city'        => is_null($request->input('city')) ? '' : $request->input('city'),
                'postal_code' => is_null($request->input('postal_code')) ? '' : $request->input('postal_code'),
                'country'     => is_null($request->input('country')) ? '' : $request->input('country')['code'],
                'state_code'  => is_null($request->input('state_code')) ? '' : $request->input('state_code'),
                'phone'       => is_null($request->input('phone')) ? '' : $request->input('phone'),
                'current_plan' => $current_plan ? $current_plan->id : 0
            ]);
        }
    
        return response()->json([
            'result' => 'success'
        ]);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(User $user)
    {
        $user->delete();
    
        return response()->json(['status' => 'success']);
    }
}
