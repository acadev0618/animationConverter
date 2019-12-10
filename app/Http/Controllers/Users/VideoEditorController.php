<?php

namespace App\Http\Controllers\Users;

use App\Models\VideoTemplates;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VideoEditorController extends Controller
{
    //
    public function index(Request $request) {
        $id = $request->has('id') ? $request->get('id') : false;
        $videoTemplate = $id ? VideoTemplates::find($id) : false;
        $createFrom = false;

//        $userRole = auth()->user()->roles()->get()[0];
//
//        $TEMPLATE_EDITABLE = $userRole['template_editable'] === 1 ? true : false;

        $TEMPLATE_EDITABLE =  true ;
        $customSidebar = true;
        return view('users.video-editor', compact('videoTemplate', 'createFrom', 'TEMPLATE_EDITABLE', 'customSidebar'));
    }
    public function createFrom(Request $request) {
        $id = $request->has('id') ? $request->get('id') : false;
        $videoTemplate = $id ? VideoTemplates::find($id) : false;
        $createFrom = true;
//        $userRole = auth()->user()->roles()->get()[0];
//        $TEMPLATE_EDITABLE = $userRole['template_editable'] === 1 ? true : false;


        $TEMPLATE_EDITABLE =  true ;

        $customSidebar = true;
        return view('users.video-editor', compact('videoTemplate', 'createFrom', 'TEMPLATE_EDITABLE', 'customSidebar'));
    }
    public function viewTemplate(Request $request) {
        $id = $request->get('id');
        $videoTemplate = VideoTemplates::find($id);
        return view('users.view-template', compact('videoTemplate'));
    }
}
