<?php


namespace App\Http\Repositories\Admin;


use App\Http\Repositories\Repository;
use App\Mail\welcomeToVeasyPurchase;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class UsersRepository extends Repository
{
    public function model()
    {
        // TODO: Implement model() method.
        return app(User::class);
    }
    
    /**
     * Create users by Administrator
     *
     * @param $user_id
     * @param $request
     */
    public function create($user_id, $request)
    {
        $user = $this->model()->find($user_id);
        
        // User role register
        $roleId = $request['role']['id'];
        $user->roles()->attach($roleId);
        
        // User free plan register
        $plan = $this->getPlan();
        $user->plans()->attach($plan->id, [
            'payment_status' => 'success',
            'status'         => 'Active',
            'activated_on'   => DB::raw('NOW()'),
            'payment_method' => 'Stripe',
            'free_flag'      => 1
        ]);
        
        // User profile register
        $userPlan = $user->user_plan()->first();
        $ins_data = [
            'activated'    => 1,
            'current_plan' => $userPlan->id,
            'company'      => is_null($request['company']) ? '' : $request['company'],
            'address'      => is_null($request['address']) ? '' : $request['address'],
            'city'         => is_null($request['city']) ? '' : $request['city'],
            'postal_code'  => is_null($request['postal_code']) ? '' : $request['postal_code'],
            'country'      => is_null($request['country']) ? '' : $request['country']['code'],
            'state_code'   => is_null($request['state_code']) ? '' : $request['state_code'],
            'phone'        => is_null($request['phone']) ? '' : $request['phone'],
        ];
        $user->user_profile()->create($ins_data);
        
        Mail::to($user->email)->send(new welcomeToVeasyPurchase($user, $request['password']));
    }
    
    /**
     * Get plan data.
     *
     * @param string $product_id
     * @return mixed
     */
    public function getPlan($product_id = '')
    {
        if (!isset($product_id) || is_null($product_id) || !$product_id || $product_id == '') {
            return DB::table('plans')->where('free_plan', '=', '1')->where('status', '=', 'Active')->first();
        } else {
            return DB::table('plans')->where('product_id', '=', $product_id)->first();
        }
    }
    
    public function getMembers($request)
    {
        $members = $this->model()
            ->with([
                'roles',
                'plans',
                'user_profile',
                'user_plan'
            ])
            ->whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('user_plans')
                    ->whereRaw('user_plans.user_id = users.id');
            });
        
        if (isset($request['name']) && !empty($request['name'])) {
            $nameAry = explode(' ', $request['name']);
            if (isset($nameAry[1])) {
                $members->where('users.name', 'like', '%' . $nameAry[0] . '%');
                $members->where('users.last_name', 'like', '%' . $nameAry[1] . '%');
            } else {
                $members->where('users.name', 'like', '%' . $request['name'] . '%');
            }
        }
        
        if (isset($request['email']) && !empty($request['email'])) {
            $members->where('users.email', 'like', '%' . $request['email'] . '%');
        }
        
        if (isset($request['role']) && !empty($request['role'])) {
            $members->whereExists(function ($query) use ($request) {
                $query->select(DB::raw(1))
                    ->from('role_user')
                    ->whereRaw('role_user.user_id = users.id')
                    ->whereRaw('role_user.role_id = "' . $request['role'] . '"');
            });
        }
        
        if (isset($request['banned']) && !empty($request['banned'])) {
            if ($request['banned'] == '2') {
                $request['banned'] = 0;
            }
            $members->whereExists(function ($query) use ($request) {
                $query->select(DB::raw(1))
                    ->from('user_profiles')
                    ->whereRaw('user_profiles.user_id = users.id')
                    ->whereRaw('user_profiles.banned = "' . $request['banned'] . '"');
            });
        }
        
        if (isset($request['subscription']) && !empty($request['subscription'])) {
            $members->whereExists(function ($query) use ($request) {
                $query->select(DB::raw(1))
                    ->from('user_plans')
                    ->whereRaw('user_plans.user_id = users.id')
                    ->whereRaw('user_plans.status = "' . $request['subscription'] . '"');
            });
        }
        
        if (isset($request['plan']) && !empty($request['plan'])) {
            $members->whereExists(function ($query) use ($request) {
                $query->select(DB::raw(1))
                    ->from('user_plans')
                    ->whereRaw('user_plans.user_id = users.id')
                    ->whereRaw('user_plans.plan_id = "' . $request['plan'] . '"');
            });
        }
        
        $members = $members->get()
            ->toArray();
        
        return $members;
    }
}
