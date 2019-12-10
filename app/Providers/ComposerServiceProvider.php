<?php
/**
 * Created by PhpStorm.
 * User: MY
 * Date: 4/17/2019
 * Time: 5:25 PM
 */

namespace App\Providers;


use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer('admin/index', 'App\Http\ViewComposers\MembersComposer');
    }
    
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
