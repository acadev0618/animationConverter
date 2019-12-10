<?php
if (!function_exists('isActiveRoute')) {
    function isActiveRoute($route, $output = 'active')
    {
        if (is_array($route)) {
            $check = 0;
            for ($i = 0; $i < count($route); $i++) {
                if (Route::currentRouteName() == $route[$i]) {
                    $check = 1;
                    break;
                }
            }
            if ($check) {
                return $output;
            } else {
                return '';
            }
        } else {
            if (Route::currentRouteName() == $route) {
                return $output;
            }
        }
        
        return '';
    }
}

if (!function_exists('isExpendRoute')) {
    function isExpendRoute($route)
    {
        if (is_array($route)) {
            $check = 0;
            for ($i = 0; $i < count($route); $i++) {
                if (Route::currentRouteName() == $route[$i]) {
                    $check = 1;
                    break;
                }
            }
            if ($check) {
                return 'true';
            } else {
                return 'false';
            }
        } else {
            if (Route::currentRouteName() == $route) {
                return 'true';
            }
        }
        
        return 'false';
    }
}

if (!function_exists('isActiveResource')) {
    function isActiveResource($route, $except = true, $output = 'active')
    {
        $check = 0;
        
        if (is_array($route)) {
            for ($i = 0; $i < count($route); $i++) {
                if ($except)
                    $resource = [$route[$i], $route[$i] . '.index', $route[$i] . '.show', $route[$i] . '.edit'];
                else
                    $resource = [$route[$i], $route[$i] . '.index', $route[$i] . '.create', $route[$i] . '.show', $route[$i] . '.edit'];
                
                for ($j = 0; $j < count($resource); $j++) {
                    if (Route::currentRouteName() == $resource[$j]) {
                        $check = 1;
                        break;
                    }
                }
                
                if ($check == 1)
                    break;
            }
            
            if ($check) {
                return $output;
            } else {
                return '';
            }
        } else {
            if ($except)
                $resource = [$route, $route . '.index', $route . '.show', $route . '.edit'];
            else
                $resource = [$route, $route . '.index', $route . '.create', $route . '.show', $route . '.edit'];
            
            for ($j = 0; $j < count($resource); $j++) {
                if (Route::currentRouteName() == $resource[$j]) {
                    $check = 1;
                    break;
                }
            }
            
            if ($check) {
                return $output;
            } else {
                return '';
            }
        }
    }
}

if (!function_exists('getConfig')) {
    function getConfig($config_key)
    {
        return MyConfig::getValue($config_key);
    }
}

if (!function_exists('isSupperAdmin')) {
    function isSupperAdmin()
    {
        $currentUser = auth()->user();
        
        $admin = getConfig('admin_email');
        if ($currentUser->email == $admin) {
            return true;
        }


       

        return false;
    }
}

if (!function_exists('isAdminUser')) {
    function isAdminUser()
    {
        if (auth()->user()->roles) {
            foreach (auth()->user()->roles as $row) {
                if ($row->is_admin) {
                    return true;
                }
            }
        }
        
        return false;
    }
}

if (!function_exists('getSecureRedirect')) {
    function getSecureRedirect()
    {
        $server_protocol = 'http://';
        if (Request::secure()) {
            $server_protocol = 'https://';
        }
        
        return $server_protocol;
    }
}

if (!function_exists('secure_routing')) {
    function secure_routing($url)
    {
        if (config('site.ssl_tf') && config('site.ssl_tf') != null) {
            $s_protocol = 'http://';
            $sec_protocol = 'https://';
            
            return str_replace($s_protocol, $sec_protocol, $url);
        } else {
            return $url;
        }
    }
}
if (!function_exists('quickRandom')) {
    function quickRandom($length = 16)
    {
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        return substr(str_shuffle(str_repeat($pool, 5)), 0, $length);
    }
}

