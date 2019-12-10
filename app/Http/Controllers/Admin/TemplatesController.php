<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TemplatesController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $flag = $request->input('flag');
        $templates = Template::where('temp_type', '<>', 'custom')->where('project_id', '0');
        if ($flag == '0') {
            $templates = $templates->where('temp_type', 'bodymovin')->where('text_template', '0');
        } else if ($flag == '1') {
            $templates = $templates->where('temp_type', 'bodymovin')->where('text_template', '1');
        } else if ($flag == '2') {
            $templates = $templates->where('temp_type', 'template')->where('text_template', '0');
        }
        
        $templates = $templates->get();
        
        if ($templates) {
            return response()->json($templates->toArray());
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
        $flag = $request->input('flag');
        $temp_name = $request->input('temp_name');
        $data_json = $request->input('data_json');
        $bg_image_url = $request->input('bg_image_url');
        $thumb_url = $request->input('thumb_url');
        $aspect_type = $request->input('aspect_type');
        $tempFile = $request->file('file');
        if ($tempFile) {
//            $fullPath = $tempFile->getRealPath();
            if ($flag == '2' || $flag == '0') {
//                $result = shell_exec('ffmpeg -i ' . $fullPath . ' 2>&1');
//                preg_match('/(?<=Duration: )(\d{2}:\d{2}:\d{2})\.\d{2}/', $result, $match);
//                $duration = $match[1];
//                $duration = explode(':', $duration);
//                $duration = $duration[0] * 60 * 60 + $duration[1] * 60 + $duration[2];
//                $duration = round($duration * 1000);
                $duration = 9290;
                Storage::PutFileAs('libraries/backgrounds/', $tempFile, $bg_image_url, ['visibility' => 'public']);
            }/* else if ($flag == '0') {
                $duration = 9290;
                Storage::PutFileAs('libraries/backgrounds/', $tempFile, $bg_image_url, ['visibility' => 'public']);
            }*/ else {
                $duration = 5000;
            }
        } else {
            if ($flag == '0') {
                $duration = 9290;
            } else if ($flag == '1') {
                $duration = 5000;
            } else {
                $duration = 15000;
            }
        }
        if ($flag == '1') {
            $text_temp = 1;
        } else {
            $text_temp = 0;
        }
        
        if ($flag == '2') {
            $temp_type = 'template';
        } else {
            $temp_type = 'bodymovin';
        }
        
        
        $ins_data = [
            'temp_name'     => $temp_name,
            'data_json'     => $data_json,
            'bg_image_url'  => is_null($bg_image_url) ? '' : $bg_image_url,
            'thumb_url'     => is_null($thumb_url) ? '' : $thumb_url,
            'aspect_type'   => is_null($aspect_type) ? '' : $aspect_type,
            'asset_type'    => 'Photo-only',
            'duration'      => $duration,
            'text_template' => $text_temp,
            'temp_type'     => $temp_type,
            'text_order'    => 0,
        ];
        
        $libraries = new Template();
        $id = $libraries->insertGetId($ins_data);
        
        //
        $re = [
            'result' => 'success',
            'id'     => $id
        ];
        
        return response()->json($re);
    }
    
    /**
     * Display the specified resource.
     *
     * @param \App\Models\Template $template
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template)
    {
        return response()->json($template);
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Template $template
     * @return \Illuminate\Http\Response
     */
    public function edit(Template $template)
    {
    
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Template $template
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Template $template)
    {
        $template->temp_name = $request->input('temp_name');
        $template->data_json = $request->input('data_json');
        $template->bg_image_url = $request->input('bg_image_url');
        $template->thumb_url = $request->input('thumb_url');
        $template->aspect_type = $request->input('aspect_type');
        $template->save();
        
        return response()->json([
            'result' => 'success'
        ]);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Template $template
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Template $template)
    {
        $bg_image = $template->bg_image_url;
        $thumb_image = $template->thumb_url;
        $file1 = 'libraries/backgrounds/' . $bg_image;
        $file2 = 'libraries/backgrounds/' . $thumb_image;
        if (Storage::exists($file1)) {
            Storage::delete($file1);
        }
        
        if (Storage::exists($file2)) {
            Storage::delete($file2);
        }
        
        $template->delete();
        
        return response()->json([
            'result' => 'success'
        ]);
    }
}
