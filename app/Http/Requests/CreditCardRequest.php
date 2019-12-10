<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use LVR\CreditCard\CardCvc;
use LVR\CreditCard\CardExpirationMonth;
use LVR\CreditCard\CardExpirationYear;
use LVR\CreditCard\CardNumber;

class CreditCardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'credit_card_number'       => ['required', new CardNumber],
            'credit_card_expire_year'  => ['required', new CardExpirationYear($this->get('credit_card_expire_month'))],
            'credit_card_expire_month' => ['required', new CardExpirationMonth($this->get('credit_card_expire_year'))],
            'credit_card_cvv'          => ['required', new CardCvc($this->get('credit_card_cvv'))]
        ];
    }
}
