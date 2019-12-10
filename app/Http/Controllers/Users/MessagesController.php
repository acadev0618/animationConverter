<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Mail\reportToSupport;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $page_title = 'Support';
        
        return view('users.support', compact('page_title'));
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
            'email'           => 'required|email',
            'message_subject' => 'required|min:2|max:255',
            'message_content' => 'required|min:10'
        ]);
        
        $attached_file = '';
        if ($request->hasFile('attached_file')) {
            $file = $request->file('attached_file');
            $fileName = $file->getClientOriginalName();
            Storage::PutFileAs(config('site.users-path') . 'messages/' . auth()->user()->id, $file, $fileName, ['visibility' => 'public']);
            $attached_file = Storage::url(config('site.users-path') . 'messages/' . auth()->user()->id . '/' . $fileName);
        }
        
        $ins_data = [
            'user_id'         => auth()->user()->id,
            'from_name'       => auth()->user()->name,
            'email'           => $request->email,
            'message_subject' => $request->message_subject,
            'message_content' => $request->message_content,
            'attached_file'   => $attached_file,
            'status'          => Message::REQUEST_STATUS_OPEN
        ];
        Mail::to(config('site.support-email'))->bcc([$request->email])->send(new reportToSupport($ins_data));
        
        unset($ins_data['from_name']);
        Message::insertGetId($ins_data);
        
        session()->flash('success', 'Successfully sent messages. we will get back to you within the next 24 hours.');
        
        return redirect('messages', 302, [], config('site.ssl_tf'));
    }
    
    /**
     * Display the specified resource.
     *
     * @param \App\Models\Message $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        //
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Message $message
     * @return \Illuminate\Http\Response
     */
    public function edit(Message $message)
    {
        //
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Message $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Message $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
