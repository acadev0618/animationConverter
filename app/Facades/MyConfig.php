<?php
/**
 * Created by PhpStorm.
 * User: MY
 * Date: 4/19/2018
 * Time: 1:33 PM
 */

namespace App\Facades;


use Illuminate\Support\Facades\Facade;

class MyConfig extends Facade
{
	public static function getFacadeAccessor()
	{
		return 'MyConfig';
	}
}