<?php


namespace App\Http\Repositories\Admin;


use App\Http\Repositories\Repository;
use App\Models\Config;
use Illuminate\Http\Request;

class ConfigsRepository extends Repository
{
    public function model()
    {
        // TODO: Implement model() method.
        return app(Config::class);
    }
    
    public function getByTag($tag)
    {
        return $this->model()->where('tag', $tag)->get();
    }
    
    public function saveSettings(array $inputs)
    {
        foreach ($inputs as $key => $value) {
            $map = $this->model()->firstOrNew([
                'key' => $key
            ]);
            
            $map->key = $key;
            $map->tag = 'settings';
            $map->value = $value;
            $map->save();
        }
    }
    
    public function getArrayByTag($tag)
    {
        $maps = $this->getByTag($tag);
        $arr = [];
        foreach ($maps as $map) {
            $arr[$map->key] = $map->value;
        }
        
        return $arr;
    }
    
    public function get($key)
    {
        return $this->model()->where('key', $key)->first();
    }
    
    public function getValue($key, $default = null)
    {
        $map = $this->get($key);
        if ($map && !$map->value == null && !$map->value == '')
            return $map->value;
        
        return $default;
    }
    
    public function getBoolValue($key, $default = false)
    {
        $defaultValue = $default ? 'true' : 'false';
        
        return $this->getValue($key, $defaultValue) == 'true';
    }
    
    public function delete($key)
    {
        return $this->model()->where('key', $key)->delete();
    }
    
    public function create(Request $request)
    {
        $map = $this->model()->create([
            'key'   => $request['key'],
            'value' => $request['value'],
        ]);
        
        return $map;
    }
}
