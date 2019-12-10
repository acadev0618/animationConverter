<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class reportToSupport extends Mailable
{
    use Queueable, SerializesModels;
    protected $mail_data;
    
    /**
     * reportToSupport constructor.
     *
     * @param $mail_data
     */
    public function __construct($mail_data)
    {
        //
        $this->mail_data = $mail_data;
    }
    
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $re_data = $this->from($this->mail_data['email'], $this->mail_data['from_name'])
            ->markdown('vendor.notifications.email')
            ->subject($this->mail_data['message_subject'])
            ->with([
                'greeting'   => 'Hi,',
                'introLines' => [
                    $this->mail_data['message_content']
                ],
                'actionText' => config('app.name') . ' Support',
                'level'      => 'success',
                'actionUrl'  => getSecureRedirect() . getConfig('site_domain'),
                'outroLines' => ['For any help you can contact our customer support at ' . getConfig('support_email')]
            ]);
        
        if ($this->mail_data['attached_file'] != '') {
            $re_data->attach($this->mail_data['attached_file']);
        }
        
        return $re_data;
    }
}
