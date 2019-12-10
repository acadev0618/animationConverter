<?php

namespace App\Http\Controllers\Users;

use App\Models\Template;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Pixabay\PixabayClient;

class VideoEditorElementsController extends Controller
{
    //
    protected $pixabay;
    public function __construct()
    {
        $this->pixabay = new PixabayClient([
            'key' => config('site.pixabay_api_token')
        ]);
    }
    public function getImage() {
    }
    public function getTemplates(Request $request) {
        $where = $request->get('where');
        $rows = Template::where($where)->get();
        return Response()->json(['items' => $rows]);
    }
}
