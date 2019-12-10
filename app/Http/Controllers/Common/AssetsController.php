<?php

namespace App\Http\Controllers\Common;

use App\Models\Asset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Pixabay\PixabayClient;

class AssetsController extends Controller
{
    //
    protected $model;
    protected $pixabay;
    public function __construct(Asset $model)
    {
        $this->model = $model;
        $this->pixabay = new PixabayClient([
            'key' => config('site.pixabay_api_token')
        ]);
    }

    public function get(Request $request) {
        $where = $request->get('where');
        $model = $this->model;
        if ($where) {
            $model = $model->where($where);
        }
        $rows = $model->get();
        $fRows = collect($rows)->map(function ($row) {
            switch ($row->file_type) {
                case 'sound':
                    $row->abs_url = Storage::url('libraries/sounds/' . $row->file_name);
                    break;
                default:
                    $row->thumb_url = Storage::url('libraries/' . $row->file_type . '/' . $row->file_name);
                    break;
            }
            return $row;
        });
        return Response()->json($fRows);
    }
    public function getStockImage(Request $request) {
        $query = [
            'q' => $request->get('query'),
            'page' => (int) $request->get('page') ?: 1,
            'per_page' => $request->get('per_page') ?: config('site.onPage1')
        ];
        if (!$request->has('query')){
            $query['category'] = 'nature';
        }
        $files = $this->pixabay->getImages($query, true);
        if ($files['hits']) {
            return Response()->json($files['hits']);
        }
        return Response()->json([]);
    }
    public function getStockVideo(Request $request) {
        $query = [
            'q' => $request->get('query'),
            'page' => (int) $request->get('page') ?: 1,
            'per_page' => $request->get('per_page') ?: config('site.onPage1')
        ];
        if (!$request->has('query')){
            $query['category'] = 'nature';
        }
        $files = $this->pixabay->getVideos($query, true);
        if ($files['hits']) {
            $items = $files['hits'];
            foreach ($items as &$item) {
                $item['thumb_url'] = 'https://i.vimeocdn.com/video/'. $item['picture_id'] .'_200x150.jpg ';
                $item['thumb_width'] = 200;
                $item['thumb_height'] = 150;
            }
            return Response()->json($items);
        }
        return Response()->json([]);
    }
}
