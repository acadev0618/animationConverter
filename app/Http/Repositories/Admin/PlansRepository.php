<?php


namespace App\Http\Repositories\Admin;


use App\Http\Repositories\Repository;
use App\Plan;

class PlansRepository extends Repository
{
    public function model()
    {
        // TODO: Implement model() method.
        return app(Plan::class);
    }
    
    public function create($request)
    {
        $ins_data = [
            'plan_name'         => $request->plan_name,
            'product_id'        => is_null($request->product_id) ? '' : $request->product_id,
            'product_url'       => is_null($request->product_url) ? '' : $request->product_url,
            'amount'            => is_null($request->amount) ? 0 : $request->amount,
            'free_plan'         => $request->free_plan ? 1 : 0,
            'trial_plan'        => $request->trial_plan ? 1 : 0,
            'trial_duration'    => is_null($request->trial_duration) ? 0 : $request->trial_duration,
            'duration'          => is_null($request->duration) ? 0 : $request->duration,
            'duration_schedule' => is_null($request->duration_schedule) ? '' : $request->duration_schedule,
            'video_limit'       => is_null($request->video_limit) ? 0 : $request->video_limit,
            'publish_limit'     => is_null($request->publish_limit) ? 0 : $request->publish_limit,
            'share_limit'       => is_null($request->share_limit) ? 0 : $request->share_limit,
            'status'            => is_null($request->status) ? '' : $request->status,
            'description'       => $request->description,
        ];
        
        $this->model()->insert($ins_data);
    }
    
    public function getListData()
    {
        $data = $this->model()->orderBy('id', 'asc')->get();
        $re = [];
        if ($data) {
            foreach ($data as $key => $row) {
                $re[$key] = $row;
                $v_limit = $row->video_limit == 0 ? 'Unlimited' : $row->video_limit;
                $p_limit = $row->publish_limit == 0 ? 'Unlimited' : $row->publish_limit;
                $s_limit = $row->share_limit == 0 ? 'Unlimited' : $row->share_limit;
                $re[$key]['video_limit'] = 'Video:' . $v_limit . ', Publish:' . $p_limit . ', Share:' . $s_limit;
                $re[$key]['amount'] = $row->amount != 0 ? '$' . number_format($row->amount, 2) : '';
                $re[$key]['duration'] = $row->duration != 0 ? $row->duration . ' ' . $row->duration_schedule : '';
                $re[$key]['trial_duration'] = $row->trial_duration != 0 ? $row->trial_duration . ' day(s)' : '';
            }
        }
        
        return $re;
    }
}
