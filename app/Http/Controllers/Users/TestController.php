<?php

namespace App\Http\Controllers\Users;

use App\Models\Message;
use App\Models\VideoTemplates;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TestController extends Controller
{
    public function create(Request $request)
    {
        $id = $request->has('id') ? $request->get('id') : false;
        $id =28;
        $videoTemplate = $id ? VideoTemplates::find($id) : false;

        $createFrom = false;
//        $userRole = auth()->user()->roles()->get()[0];
//        $TEMPLATE_EDITABLE = $userRole['template_editable'] === 1 ? true : false;
        $TEMPLATE_EDITABLE = false;
        $customSidebar = true;

//             //JSON object
//             var  $jsonobj = [
//                 '{"id":"ID1", "px":10, "py":50,"w":60, "h":60, "bgColor":"black"}',
//                 '{"id":"ID2", "px":80, "py":50,"w":60, "h":60, "bgColor":"grey"}',
//                 '{"id":"ID3", "px":150, "py":50,"w":60, "h":60, "bgColor":"yellow"}',
//                 '{"id":"ID4", "px":220, "py":50,"w":60, "h":60, "bgColor":"green"}',
//             ];

//        $jsonobj = '{"Peter":35,"Ben":37,"Joe":43}';



//        $arr = json_decode($jsonobj, true);
//
//        foreach($arr as $key => $value) {
//            echo $key . " => " . $value . "<br>";
//        }

        $ins_data = [
            'id'       => "ID1",
            'px'       => 10,
            'py'       => 50,
            'w'        => 130,
            'h'        => 230,
            'bgColor'  => "black"
        ];
        $cbuildings = [];
        for ($x = 0; $x < 4; $x++) {
            $ins_data ['id'] = "ID".($x+1);
            $ins_data ['px'] = 10+$x*200;
            $ins_data ['py'] = 100;
            $ins_data ['w'] = 150;
            $ins_data ['h'] = 530;
            switch ($x) {
                case "0":
                    $ins_data ['bgColor'] = "black";
                    break;
                case "1":
                    $ins_data ['bgColor'] = "grey";
                    break;
                case "2":
                    $ins_data ['bgColor'] = "yellow";
                    break;
                case "3":
                    $ins_data ['bgColor'] = "green";
                default:
                    $ins_data ['bgColor'] = "red";
            }

            $cbuildings[$x]=$ins_data;
        }

//        $cbuildings =[
//            ["id" => "ID1", "px" => 10, "py" => 50, "w" => 30, "h" => 60, "bgColor" => "black"],
//            ["id" => "ID2", "px" => 80, "py" =>  50, "w" =>  30, "h" =>  60, "bgColor" =>  "grey"],
//            ["id" =>  "ID3", "px" =>  150, "py" =>  50, "w" =>  30, "h" =>  60, "bgColor" =>  "yellow"],
//            ["id" =>  "ID4", "px" =>  220, "py" =>  50, "w" =>  30, "h" =>  60, "bgColor" =>  "green"]
//          ];


        return view('users.testRender', compact('videoTemplate', 'createFrom', 'TEMPLATE_EDITABLE', 'customSidebar','cbuildings'));
    }
}
