<?php

namespace App\Http\Controllers\Common;

use App\Models\VideoTemplates;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VideoTemplatesController extends Controller
{
    public $model;
    public function __construct()
    {
        $this->model = new VideoTemplates();
    }
    public function insert(Request $request) {
        $sets = $request->get('sets');
        $sets['user_id'] = auth()->user()->id;
        $row = $this->model->create($sets);
        if (!isset($row['aspect_group'])) {
            $this->model->where('id', $row['id'])->update(['aspect_group' => 'aspect_group_' . $row['id']]);
            $row['aspect_group'] = 'aspect_group_' . $row['id'];
        }
        return Response()->json($row);
    }
    public function update(Request $request) {
        $sets = $request->get('sets');
        $where = $request->get('where');
        $this->model->where($where)->update($sets);
        return Response()->json($sets);
    }
    public function delete(Request $request) {
        $where = $request->get('where');
        $this->model->where($where)->delete();
        return Response()->json($where);
    }
    public function getMany(Request $request) {
        $where = $request->get('where') ?: [];
        $rows = $this->model->where($where)->get();
        return Response()->json($rows);
    }
    public function get(Request $request) {
        $where = $request->get('where');
        $row = $this->model->where($where)->first();
        return Response()->json($row);
    }
    public function getConfig() {
        $config = config('video_template');
        return Response()->json($config);
    }
}
