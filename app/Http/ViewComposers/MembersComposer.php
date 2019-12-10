<?php


namespace App\Http\ViewComposers;


use App\Http\Repositories\CountriesRepository;
use Illuminate\View\View;

class MembersComposer
{
    /**
     * The $countries repository implementation.
     *
     * @var CountriesRepository
     */
    protected $countries;
    
    /**
     * MembersComposer constructor.
     *
     * @param CountriesRepository $countriesRepository
     */
    public function __construct(CountriesRepository $countriesRepository)
    {
        $this->countries = $countriesRepository;
    }
    
    /**
     * Bind data to the view
     *
     * @param View $view
     */
    public function compose(View $view)
    {
        $view->with('countries', $this->countries->getValueByColumns(['country_id', 'code', 'name'], [], 'name'));
    }
}
