<?php


namespace App\Http\Repositories;


use App\Models\Countries;

class CountriesRepository extends Repository
{
    public function model()
    {
        // TODO: Implement model() method.
        return app(Countries::class);
    }
    
    public function getIncludedExcludedCountries($include_countries, $exclude_countries)
    {
        $details = [];
        
        $details['included_countries'] = $details['excluded_countries'] = [];
        if ($include_countries != '') {
            $countries = $this->getCountries($include_countries);
            
            $details['included_countries'] = $countries;
        }
        if ($exclude_countries != '') {
            $countries = $this->getCountries($exclude_countries);
            
            $details['excluded_countries'] = $countries;
        }
        
        return $details;
    }
    
    public function getCountries($country_code)
    {
        $countries = [];
        
        $country_code = explode(",", $country_code);
        
        $countries_result = $this->model()->select('code', 'name', 'iso3')->whereIn('code', $country_code)->orderBy('name', 'asc')->get();
        if ($countries_result) {
            $i = 0;
            foreach ($countries_result as $key => $values) {
                if (trim($values->name) != '') {
                    $countries[$i]['code'] = $values->code;
                    $countries[$i]['name'] = $values->name;
                    $countries[$i]['iso3'] = $values->iso3;
                }
                $i++;
            }
        }
        
        return $countries;
    }
}
