<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page_title = 'My Library';
        $files = auth()->user()->files()
            ->where('file_type', $request->input('file_type'))
            ->paginate(config('site.onPage1'));

        $file_type = $request->input('file_type');
        $type_array = ['photo', 'video', 'sound'];
        $type_array1 = ['image', 'video', 'music'];

        return view('users.my-libraries', compact('page_title', 'files', 'file_type', 'type_array', 'type_array1'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, [
            'files' => 'required'
        ]);
        $file_type = $request->input('file_type');
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
                $thumb_name = $fName1 . '_thumb.png';
                $dw = 0;
                $dh = 0;
                $fullPath = $file->getRealPath();
                if ($file_type != 'photo') {
                    $result = shell_exec('ffmpeg -i ' . $fullPath . ' 2>&1');
                    preg_match('/(?<=Duration: )(\d{2}:\d{2}:\d{2})\.\d{2}/', $result, $match);
                    $duration = $match[1];
                    $duration = explode(':', $duration);
                    $duration = $duration[0] * 60 * 60 + $duration[1] * 60 + $duration[2];
                    $duration = round($duration * 1000);
                } else {
                    $duration = 0;
                }
                if ($file_type != 'sound') {
                    if ($file_type == 'video') {
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
                    } else {
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
                    }
                }
                Storage::PutFileAs(config('site.users-path') . 'assets/' . auth()->user()->id, $file, $fName, ['visibility' => 'public']);

                $ins_data = [
                    'user_id'          => auth()->user()->id,
                    'origin_file_name' => $fileName,
                    'file_name'        => $fName,
                    'file_type'        => $file_type,
                    'duration'         => $duration,
                    'width'            => $dw,
                    'height'           => $dh,
                    'thumb_url'        => $thumb_name
                ];

                auth()->user()->files()->create($ins_data);
            }

            session()->flash('success', 'Your file is successfully uploaded.');

            return response('Done!');
        } else {
            return back()->withErrors('File Upload Error.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\File $file
     * @return \Illuminate\Http\Response
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\File $file
     * @return \Illuminate\Http\Response
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\File $file
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param File $file
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @throws \Exception
     */
    public function destroy(File $file)
    {
        //
        session()->flash('info', 'Your file is successfully deleted.');
        $file_type = $file->file_type;

        $path = config('site.users-path') . 'assets/' . $file->user_id . '/';
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path . $file->file_name);
            Storage::disk('public')->delete($path . $file->thumb_url);
        }

        $file->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}
