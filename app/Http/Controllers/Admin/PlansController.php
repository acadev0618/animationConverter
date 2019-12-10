<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Admin\PlansRepository;
use App\Plan;
use Illuminate\Http\Request;

class PlansController extends Controller
{
    protected $plansRepo;
    
    public function __construct(PlansRepository $plansRepository)
    {
        $this->plansRepo = $plansRepository;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $plans = $this->plansRepo->getListData();
    
        return response()->json($plans);
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response('create');
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, [
            'plan_name'   => 'required|unique:plans|min:2',
            'amount'      => 'required_if:free_plan,false,',
            'description' => 'required|min:2'
        ], [
            'plan_name.required'   => 'Plan Name is required.',
            'amount.required_if'   => 'Amount is required.',
            'description.required' => 'Description is required.',
        ]);
    
        $this->plansRepo->create($request);
    
        return response()->json(['success' => 'success']);
    }
    
    /**
     * Display the specified resource.
     *
     * @param \App\Plan $plan
     * @return \Illuminate\Http\Response
     */
    public function show(Plan $plan)
    {
        return response()->json($plan);
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Plan $plan
     * @return \Illuminate\Http\Response
     */
    public function edit(Plan $plan)
    {
        //
        return response()->json($plan);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param \App\Plan $plan
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Plan $plan)
    {
        //
        $this->validate($request, [
            'plan_name'   => 'required|unique:plans,plan_name,' . $plan->id . '|min:2',
            'amount'      => 'required_if:free_plan,false,',
            'description' => 'required|min:2'
        ], [
            'plan_name.required'   => 'Plan Name is required.',
            'amount.required_if'   => 'Amount is required.',
            'description.required' => 'Description is required.',
        ]);
    
        $params = $request->all();
        foreach ($params as $key => $val) {
            if (is_null($val)) {
                if ($key == 'amount' || $key == 'duration' || $key == 'trial_duration' || $key == 'video_limit' || $key == 'publish_limit' || $key == 'share_limit') {
                    $params[$key] = 0;
                } else {
                    $params[$key] = '';
                }
            }
        
            if ($key == 'free_plan' || $key == 'trial_plan') {
                if ($val) {
                    $params[$key] = 1;
                } else {
                    $params[$key] = 0;
                }
            }
        }
    
        $plan->fill($params);
        $plan->save();
    
        return response()->json(['success' => 'success']);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Plan $plan
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Plan $plan)
    {
        //
        $plan->delete();
    
        return response()->json(['success' => 'success']);
    }
}
