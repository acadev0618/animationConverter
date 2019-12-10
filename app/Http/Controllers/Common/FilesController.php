<?php

namespace App\Http\Controllers\Common;

use App\Models\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    //
    protected $model;
    public function __construct(File $model)
    {
        $this->model = $model;
    }

    public function uploadPhoto(Request $request) {
        $file = $request->file('photo');
        $fileName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $fName1 = time() . '_' . rand(200000, 2500000);
        $fName = $fName1 . '.' . $extension;
        $thumb_name = $fName1 . '_thumb.png';
        $fullPath = $file->getRealPath();
        $duration = 0;
        if ($extension != 'SVG' && $extension != 'svg') {
            $cmd = 'ffmpeg -i ' . $fullPath . ' -vf scale=320:-1 ' . public_path('/uploads/thumbs/' . $thumb_name) . ' 2>&1';
            exec($cmd, $output, $status);
            $i_d = getimagesize($fullPath);
            $dw = $i_d[0];
            $dh = $i_d[1];
        } else {
            $xml = simplexml_load_file($fullPath);
            $attr = $xml->attributes();
            $wAry = explode(' ', $attr->viewBox);
            $dw = isset($wAry[2]) ? $wAry[2] : 0;
            $dh = isset($wAry[3]) ? $wAry[3] : 0;
        }
        $thumb_name = $fName;
        Storage::PutFileAs(config('site.users-path') . 'assets/' . auth()->user()->id, $file, $fName, ['visibility' => 'public']);

        $ins_data = [
            'user_id'          => auth()->user()->id,
            'origin_file_name' => $fileName,
            'file_name'        => $fName,
            'file_type'        => 'photo',
            'duration'         => $duration,
            'width'            => $dw,
            'height'           => $dh,
            'thumb_url'        => $thumb_name
        ];

        $res = auth()->user()->files()->create($ins_data);
        $res['thumb_url'] = Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $res['thumb_url']);
        return Response()->json($res);
    }
    public function uploadVideo(Request $request) {
        $file = $request->file('video');
        $fileName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $fName1 = time() . '_' . rand(200000, 2500000);
        $fName = $fName1 . '.' . $extension;
        $thumb_name = $fName1 . '_thumb.png';
        $dw = 0;
        $dh = 0;
        $fullPath = $file->getRealPath();

        $result = shell_exec('ffmpeg -i ' . $fullPath . ' 2>&1');
        preg_match('/(?<=Duration: )(\d{2}:\d{2}:\d{2})\.\d{2}/', $result, $match);
        $duration = $match[1];
        $duration = explode(':', $duration);
        $duration = $duration[0] * 60 * 60 + $duration[1] * 60 + $duration[2];
        $duration = round($duration * 1000);

        $cmd = 'ffmpeg -i ' . $fullPath . ' -ss 00:00:01 -vframes 1 -vf scale=720:380 -y ' . public_path('/uploads/thumbs/' . $thumb_name) . ' 2>&1';
        exec($cmd, $output, $status);
        $exe_str = 'ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of default=nw=1:nk=1 ' . escapeshellcmd($fullPath) . ' 2>&1';
        exec($exe_str, $output1, $status);
        $dw = $output1[0] * 1;
        $dh = $output1[1] * 1;

        if ($status === 0) {
            $contents1 = file_get_contents(public_path('/uploads/thumbs/' . $thumb_name));
            Storage::disk('public')->put(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $thumb_name, $contents1, 'public');
            if (file_exists(public_path('/uploads/thumbs/' . $thumb_name))) {
                unlink(public_path('/uploads/thumbs/' . $thumb_name));
            }
        }

        Storage::PutFileAs(config('site.users-path') . 'assets/' . auth()->user()->id, $file, $fName, ['visibility' => 'public']);

        $ins_data = [
            'user_id'          => auth()->user()->id,
            'origin_file_name' => $fileName,
            'file_name'        => $fName,
            'file_type'        => 'video',
            'duration'         => $duration,
            'width'            => $dw,
            'height'           => $dh,
            'thumb_url'        => $thumb_name
        ];

        $res = auth()->user()->files()->create($ins_data);
        $res['thumb_url'] = Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $res['thumb_url']);
        $res['abs_url'] = Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $res['file_name']);

        return $res;
    }
    public function uploadSound(Request $request) {
        //
        $rows = [];
        $this->validate($request, [
            'files' => 'required'
        ]);
        if ($request->hasFile('files')) {
            $this->validate($request, [
                'files.*' => 'required|max:51200'
            ]);
            $files = $request->file('files');
            foreach ($files as $file) {
                $fileName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fName1 = time() . '_' . rand(200000, 2500000);
                $fName = $fName1 . '.' . $extension;
                $thumb_name = '';
                $dw = 0;
                $dh = 0;
                $fullPath = $file->getRealPath();

                $result = shell_exec('ffmpeg -i ' . $fullPath . ' 2>&1');
                preg_match('/(?<=Duration: )(\d{2}:\d{2}:\d{2})\.\d{2}/', $result, $match);
                $duration = $match[1];
                $duration = explode(':', $duration);
                $duration = $duration[0] * 60 * 60 + $duration[1] * 60 + $duration[2];
                $duration = round($duration * 1000);

                Storage::PutFileAs(config('site.users-path') . 'assets/' . auth()->user()->id, $file, $fName, ['visibility' => 'public']);

                $ins_data = [
                    'user_id'          => auth()->user()->id,
                    'origin_file_name' => $fileName,
                    'file_name'        => $fName,
                    'file_type'        => 'sound',
                    'duration'         => $duration,
                    'width'            => $dw,
                    'height'           => $dh,
                    'thumb_url'        => $thumb_name
                ];
                $row = auth()->user()->files()->create($ins_data);
                $row['abs_url'] = Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $row['file_name']);
                array_push($rows, $row);
            }
            return Response()->json($rows);
        }
    }
    public function get(Request $request) {
        $where = $request->get('where');
        $items = auth()->user()->files()->where($where)->get();
        foreach ($items as &$item) {
            $item['thumb_url'] = Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $item['thumb_url']);
            $item['abs_url'] = Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $item['file_name']);
        }
        return Response()->json($items);
    }
}
