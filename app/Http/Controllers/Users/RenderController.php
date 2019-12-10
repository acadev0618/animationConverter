<?php

namespace App\Http\Controllers\Users;

use App\Models\VideoTemplates;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RenderController extends Controller
{
    public function create(Request $request)
    {
        $id = $request->has('id') ? $request->get('id') : false;
        $videoTemplate = $id ? VideoTemplates::find($id) : false;
        $createFrom = false;
//        $userRole = auth()->user()->roles()->get()[0];
//        $TEMPLATE_EDITABLE = $userRole['template_editable'] === 1 ? true : false;
        $TEMPLATE_EDITABLE = false;
        $customSidebar = true;
        return view('users.bufRender', compact('videoTemplate', 'createFrom', 'TEMPLATE_EDITABLE', 'customSidebar'));
    }
}
