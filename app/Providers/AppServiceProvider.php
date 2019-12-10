<?php

namespace App\Providers;

use App\Http\Repositories\Admin\ConfigsRepository;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->singleton('MyConfig', function ($app) {
            return new ConfigsRepository();
        });
        require_once __DIR__ . '/../Http/Helpers.php';
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Schema::defaultStringLength(200);
    }
}
