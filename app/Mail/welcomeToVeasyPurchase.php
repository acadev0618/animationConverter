<?php

namespace App\Mail;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class welcomeToVeasyPurchase extends Mailable
{
    use Queueable, SerializesModels;
    
    protected $user;
    protected $password;
    
    /**
     * welcomeToVeasyPurchase constructor.
     *
     * @param User $user
     * @param $password
     */
    public function __construct(User $user, $password)
    {
        //
        $this->user = $user;
        $this->password = $password;
    }
    
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('vendor.notifications.email')
            ->subject('Welcome to ' . config('app.name') . ' (Your Login information inside)')
            ->with([
                'greeting'   => 'Hi ' . $this->user->name,
                'introLines' => [
                    'Your new account is ready! Thank you for joining ' . config('app.name') . '.<br> Your Login Email is "' . htmlspecialchars($this->user->email) . '" and Password is "' . htmlspecialchars($this->password) . '"'
                ],
                'actionText' => 'Welcome to ' . config('app.name'),
                'level'      => 'success',
                'actionUrl'  => getSecureRedirect() . getConfig('site_domain'),
                'outroLines' => ['For any help you can contact our customer support at ' . getConfig('support_email')]
            ]);
    }
}
