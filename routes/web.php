<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'HomeController@index');

Route::post('api/login','AuthController@login');
Route::post('/api/load_uploads_folder_content', 'Api\FilesController@load_uploads_folder_content');

Route::get('/api/get_user', 'Api\UsersController@me');
Route::get('/api/get_categories_tree/{lang}', 'Api\CategoriesController@get_tree');
Route::get('/api/get_articles_by_category/{id}', 'Api\CategoriesController@get_articles_by_category');
Route::post('/api/save_category', 'Api\CategoriesController@save_category');
Route::get('/api/get_category/{id}', 'Api\CategoriesController@get_category');
Route::get('/api/delete_category/{id}', 'Api\CategoriesController@delete_category');

Route::get('/api/get_site', 'Api\CategoriesController@get_site');
Route::post('/api/save_site', 'Api\CategoriesController@save_site');

Route::post('/api/save_article', 'Api\CategoriesController@save_article');
Route::get('/api/delete_article/{id}', 'Api\CategoriesController@delete_article');
Route::get('/api/get_article/{id}', 'Api\CategoriesController@get_article');

Route::get('/api/get_product/{id}', 'Api\CategoriesController@get_product');
Route::get('/api/delete_product/{id}', 'Api\CategoriesController@delete_product');
Route::post('/api/save_product', 'Api\CategoriesController@save_product');

Route::get('/api/get_baseinfo/{id}', 'Api\CategoriesController@get_baseinfo');
Route::get('/api/delete_baseinfo/{id}', 'Api\CategoriesController@delete_baseinfo');
Route::post('/api/save_baseinfo', 'Api\CategoriesController@save_baseinfo');

Route::post('/api/save_download', 'Api\CategoriesController@save_download');
Route::get('/api/get_download/{id}', 'Api\CategoriesController@get_download');
Route::get('/api/delete_download/{id}', 'Api\CategoriesController@delete_download');

Route::post('/api/upload','Api\FilesController@upload');
Route::post('/api/create_new_folder','Api\FilesController@create_new_folder');
Route::post('/api/delete_file','Api\FilesController@delete_file');

Route::post('/save_uploade_image', 'Api\FilesController@save_upload');