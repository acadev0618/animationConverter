<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AssetsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $flag = $request->input('flag');
        $file_type = ['pattern', 'texture', 'video', 'graphics', 'lines', 'shapes', 'sound'];
        $libraries = Asset::where('file_type', $file_type[$flag])->get();
        
        if ($libraries) {
            return response()->json($libraries->toArray());
        } else {
            return response()->json([]);
        }
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
        $tags = $request->input('tags');
        $flag = $request->input('flag');
        $description = $request->input('description');
        $file_name = quickRandom(10);
        $thumb_name = $file_name . '_thumb.png';
        
        $tempFile = $request->file('file');
        $originName = $tempFile->getClientOriginalName();
        $extension = $tempFile->getClientOriginalExtension();
        $fullPath = $tempFile->getRealPath();
        $f_name = $file_name . '.' . $extension;
        $file_type = ['pattern', 'texture', 'video', 'graphics', 'lines', 'shapes', 'sound'];
        $file_check = Asset::where('file_type', $file_type[$flag])->where('origin_file_name', $originName)->first();
        if ($file_check) {
            return response()->json([
                'result' => 'success',
                'id'     => $file_check->id
            ]);
        }
        
        if ($flag == '2' || $flag == '6') {
            $result = shell_exec('ffmpeg -i ' . $fullPath . ' 2>&1');
            preg_match('/(?<=Duration: )(\d{2}:\d{2}:\d{2})\.\d{2}/', $result, $match);
            $duration = $match[1];
            $duration = explode(':', $duration);
            $duration = $duration[0] * 60 * 60 + $duration[1] * 60 + $duration[2];
            $duration = round($duration * 1000);
        } else {
            $duration = 0;
        }
        
        if ($flag == '2') {
            $cmd = 'ffmpeg -i ' . $fullPath . ' -ss 00:00:01 -vframes 1 -vf scale=960:540 -y ' . public_path('/uploads/thumbs/' . $thumb_name) . ' 2>&1';
            exec($cmd, $output, $status);
            if ($status === 0) {
                $contents1 = file_get_contents(public_path('/uploads/thumbs/' . $thumb_name));
                Storage::put('libraries/videos/' . $thumb_name, $contents1, 'public');
                unlink(public_path('/uploads/thumbs/' . $thumb_name));
            }
            
            Storage::PutFileAs('libraries/videos/', $tempFile, $f_name, ['visibility' => 'public']);
        } else if ($flag == '0') {
            Storage::PutFileAs('libraries/pattern/', $tempFile, $f_name, ['visibility' => 'public']);
        } else if ($flag == '1') {
            Storage::PutFileAs('libraries/texture/', $tempFile, $f_name, ['visibility' => 'public']);
        } else if ($flag == '3') {
            Storage::PutFileAs('libraries/graphics/', $tempFile, $f_name, ['visibility' => 'public']);
        } else if ($flag == '4') {
            Storage::PutFileAs('libraries/lines/', $tempFile, $f_name, ['visibility' => 'public']);
        } else if ($flag == '5') {
            Storage::PutFileAs('libraries/shapes/', $tempFile, $f_name, ['visibility' => 'public']);
        } else if ($flag == '6') {
            Storage::PutFileAs('libraries/sounds/', $tempFile, $f_name, ['visibility' => 'public']);
        }
        
        $ins_data = [
            'tags'             => $tags,
            'description'      => $description,
            'file_type'        => $file_type[$flag],
            'file_name'        => $f_name,
            'origin_file_name' => $originName,
            'duration'         => $duration,
            'thumb_url'        => $thumb_name
        ];
        
        $libraries = new Asset();
        $id = $libraries->insertGetId($ins_data);
        
        $re = [
            'result' => 'success',
            'id'     => $id
        ];
        
        return response()->json($re);
    }
    
    /**
     * Display the specified resource.
     *
     * @param \App\Models\Asset $asset
     * @return \Illuminate\Http\Response
     */
    public function show(Asset $asset)
    {
        return response()->json([
            'tags'             => $asset->tags,
            'description'      => $asset->description,
            'origin_file_name' => $asset->origin_file_name,
        ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Asset $asset
     * @return \Illuminate\Http\Response
     */
    public function edit(Asset $asset)
    {
        return response()->json($asset);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Asset $asset
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Asset $asset)
    {
        $tags = $request->input('tags');
        $description = $request->input('description');
        $asset->tags = $tags;
        $asset->description = $description;
        $asset->save();
        
        return response()->json([
            'result' => 'success'
        ]);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Asset $asset
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Asset $asset)
    {
        $flag = $asset->file_type;
        $name = $asset->file_name;
        $asset->delete();
        
        $file = 'libraries/' . $name;
        
        if ($flag == 'backgrounds') {
            $file = 'libraries/backgrounds/' . $name;
        } elseif ($flag == 'video') {
            $file = 'libraries/videos/' . $name;
        } elseif ($flag == 'sound') {
            $file = 'libraries/sounds/' . $name;
        } elseif ($flag == 'image') {
            $file = 'libraries/images/' . $name;
        } elseif ($flag == 'graphics') {
            $file = 'libraries/graphics/' . $name;
        } elseif ($flag == 'shapes') {
            $file = 'libraries/shapes/' . $name;
        } elseif ($flag == 'lines') {
            $file = 'libraries/lines/' . $name;
        } elseif ($flag == 'pattern') {
            $file = 'libraries/pattern/' . $name;
        } elseif ($flag == 'texture') {
            $file = 'libraries/texture/' . $name;
        }
        
        if (Storage::exists($file)) {
            Storage::delete($file);
        }
        
        return response()->json([
            'result' => 'success'
        ]);
    }
}
