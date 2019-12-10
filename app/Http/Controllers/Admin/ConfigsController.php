<?php

namespace App\Http\Controllers\Admin;

use App\Facades\MyConfig;
use App\Http\Controllers\Controller;
use App\Models\Config;
use Illuminate\Http\Request;

class ConfigsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $configs = Config::get();
        
        $re = [];
        if ($configs) {
            foreach ($configs as $key => $row) {
                $re[$key] = $row;
            }
        }
        
        return response()->json($re);
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = [];
        $data = $request->all();
        for ($i = 0; $i < count($request->all()); $i++) {
            $input[$data[$i]['key']] = $data[$i]['value'];
        }
        
        MyConfig::saveSettings($input);
        
        return response()->json(['success' => 'Success']);
    }
    
    /**
     * Display the specified resource.
     *
     * @param \App\Models\Config $config
     * @return \Illuminate\Http\Response
     */
    public function show(Config $config)
    {
        return response('show');
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Config $config
     * @return \Illuminate\Http\Response
     */
    public function edit(Config $config)
    {
        return response('edit');
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Config $config
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Config $config)
    {
        return response('update');
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Config $config
     * @return \Illuminate\Http\Response
     */
    public function destroy(Config $config)
    {
        return response('destroy');
    }
}
