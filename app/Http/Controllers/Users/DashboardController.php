<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Admin\TemplatesRepository;
use App\Models\VideoTemplates;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $tempRepo;

    public function __construct(TemplatesRepository $templatesRepository)
    {
        $this->tempRepo = $templatesRepository;
    }

    //
    public function index()
    {
        $page_title = 'Home';

        return view('users.dashboard', compact('page_title'));
    }

    public function tutorial()
    {
        $page_title = 'Tutorial';

        return view('users.tutorial', compact('page_title'));
    }
    public function getTemplates(Request $request)
    {
        $page_title = 'Templates';

        $temp_type = $request->input('temp_type');
        $type_array = ['video', 'image'];
        $type_array1 = ['Video', 'Image'];

        $templates = $this->tempRepo->model()->where('templates.text_template', '0');
        if ($temp_type == 'image') {
            $templates = $templates->where('templates.temp_type', 'template');
        } else {
            $templates = $templates
                ->select('templates.*')
//                ->leftJoin('projects', 'templates.project_id', '=', 'projects.id')
//                ->leftJoin('users', 'projects.user_id', '=', 'users.id')
//                ->where('projects.status', '<>', 'draft')
//                ->where('projects.status', '<>', 'rendering')
//                ->where('projects.status', '<>', 'ready')
                ->where('templates.temp_type', '<>', 'template');
        }

        $category = '';
        $aspect = '';
        $asset = '';
        $design = '';
        $sort = '';
        if ($request->has('category')) {
            $category = $request->input('category');
            $templates = $templates->where('templates.category_type', $category);
        }
        if ($request->has('aspect')) {
            $aspect = $request->input('aspect');
            $templates = $templates->where('templates.aspect_type', config('site.aspect-type')[$aspect]);
        }
        if ($request->has('assets-sel')) {
            $asset = $request->input('assets-sel');
            $templates = $templates->where('templates.asset_type', config('site.asset-type')[$asset]);
        }
        if ($request->has('design')) {
            $design = $request->input('design');
            $templates = $templates->where('templates.design_type', config('site.design-type')[$design]);
        }
        if ($request->has('sort')) {
            $sort = $request->input('sort');
            $s_ary = ['popular_log', 'created_at', 'temp_name'];
            $templates = $templates->orderBy('templates.' . $s_ary[$sort], ($sort == '2' ? 'asc' : 'desc'));
        } else {
            $templates = $templates->orderBy('templates.created_at', 'desc');
        }

        $templates = $templates->paginate(config('site.onPage1'));

        return view('users.choose-template', compact('page_title', 'temp_type', 'type_array', 'type_array1', 'templates', 'category', 'aspect', 'asset', 'design', 'sort'));
    }
    public function browseVideoTemplate(Request $request) {
        $page_title = 'Video Templates';
        $videoTemplates = VideoTemplates::where('is_model', 1)->get();
//        $userRole = auth()->user()->roles()->get()[0];
//        $TEMPLATE_EDITABLE = $userRole['template_editable'] === 1 ? true : false;


        $TEMPLATE_EDITABLE =true;

        return view('users/browse-video-template', compact('page_title', 'videoTemplates', 'TEMPLATE_EDITABLE'));
    }
    public function browseMyTemplate(Request $request) {
        $page_title = 'My Templates';
        $myTemplates = VideoTemplates::where([
            'is_model' => 0,
            'user_id' => auth()->user()->id
        ])->get();
        $userRole = auth()->user()->roles()->get()[0];
        $TEMPLATE_EDITABLE = $userRole['template_editable'] === 1 ? true : false;
        return view('users/browse-my-template', compact('page_title', 'myTemplates', 'TEMPLATE_EDITABLE'));
    }
}
