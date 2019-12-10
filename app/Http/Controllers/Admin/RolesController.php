<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Admin\RolesRepository;
use App\Role;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    protected $roleRepo;
    
    public function __construct(RolesRepository $rolesRepository)
    {
        $this->roleRepo = $rolesRepository;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $roles = Role::get();
        
        $re = [];
        if ($roles) {
            foreach ($roles as $key => $row) {
                $re[$key] = $row;
                $re[$key]['owner'] = sizeof($row->users()->get()->toArray());
                $re[$key]['is_admin'] = $row->is_admin ? 'Yes' : 'No';
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
        //
        return response('create');
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
        //
        $this->validate($request, [
            'name' => 'required|unique:roles|min:2'
        ], [
            'name.required' => 'Role name is required.',
        ]);
        
        $params = $request->all();
        foreach ($params as $key => $val) {
            if (is_null($val) && $key != 'name') {
                $params[$key] = '';
            }
            
            if ($key == 'is_admin') {
                if ($val) {
                    $params[$key] = 1;
                } else {
                    $params[$key] = 0;
                }
            }
        }
        
        $role = new Role();
        $role->fill($params);
        $role->save();
        
        return response()->json(['success' => 'success']);
    }
    
    /**
     * Display the specified resource.
     *
     * @param \App\Role $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        //
        return response('show');
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Role $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        //
        return response()->json($role);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Role $role
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Role $role)
    {
        $this->validate($request, [
            'name' => 'required|unique:roles,name,' . $role->id . '|min:2'
        ], [
            'name.required' => 'Role Name is required.'
        ]);
        
        $params = $request->all();
        foreach ($params as $key => $val) {
            if (is_null($val) && $key != 'name') {
                $params[$key] = '';
            }
            
            if ($key == 'is_admin') {
                if ($val) {
                    $params[$key] = 1;
                } else {
                    $params[$key] = 0;
                }
            }
        }
        
        $role->fill($params);
        $role->save();
        
        return response()->json(['success' => 'success']);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Role $role
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Role $role)
    {
        $role->delete();
        
        return response()->json(['success' => 'success']);
    }
}
