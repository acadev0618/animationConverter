<?php

namespace App\Http\Controllers\Common;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class FileManageController extends Controller
{
    //
    public function upload(Request $request) {
        $file = $request->file('file');
        $path = $request->get('path');

        $fileName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $uniqueName = substr($fileName, 0, 10) . '_' . time() . '.' . $extension;
        Storage::putFileAs($path, $file, $uniqueName, ['visibility' => 'public']);
        $absUrl = Storage::url($path . '/' . $uniqueName);
        return Response()->json(['abs_url' => $absUrl, 'relative_url' => $path . '/' . $uniqueName]);
    }
}
