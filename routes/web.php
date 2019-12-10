<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
    Route::get('/', 'Users\DashboardController@browseVideoTemplate')->name('browse-template');
    Route::get('/dashboard', 'Users\DashboardController@index')->name('dashboard')->where(['all' => '.*']);
    Route::resource('messages', 'Users\MessagesController', ['names' => ['index' => 'messages'], 'except' => ['create', 'edit']]);

    Route::get('/tutorial', 'Users\DashboardController@tutorial')->name('tutorial');
    Route::get('/choose-templates', 'Users\DashboardController@getTemplates')->name('choose-templates');
    Route::get('/browse-template', 'Users\DashboardController@browseVideoTemplate')->name('browse-template');
    Route::get('/browse-my-template', 'Users\DashboardController@browseMyTemplate')->name('browse-my-template');
    Route::get('/account-settings', 'Users\AccountSettingController@index')->name('account-settings');
    Route::post('/account-settings', 'Users\AccountSettingController@saveSettings')->name('settings-save');

    Route::resource('files', 'Users\FilesController', ['names' => ['index' => 'files'], 'except' => ['create', 'edit', 'update']]);
    Route::get('/edit-template', 'Users\VideoEditorController@index');







    Route::get('/testPage', 'Users\TestController@create')->name('testPage');


