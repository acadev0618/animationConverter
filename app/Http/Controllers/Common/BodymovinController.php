<?php

namespace App\Http\Controllers\Common;

use App\Models\Bodymovin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BodymovinController extends Controller
{
    //
    public $model;
    public function __construct()
    {
        $this->model = new Bodymovin();
    }

    public function insert(Request $request) {
        $sets = $request->get('sets');
        $row = $this->model->create($sets);
        return Response()->json($row);
    }
    public function delete(Request $request) {
        $where = $request->get('where');
        $this->model->where($where)->delete();
        return Response()->json($where);
    }
    public function update(Request $request) {
        $where = $request->get('where');
        $sets = $request->get('sets');
        $this->model->where($where)->update($sets);
        return Response()->json($sets);
    }
    public function get(Request $request) {
        $where = $request->get('where');
        $row = $this->model->where($where)->first();
        return Response()->json($row);
    }
    public function getMany(Request $request) {
        $where = $request->get('where');
        $rows = $this->model->where($where)->get();
        return Response()->json($rows);
    }
}
