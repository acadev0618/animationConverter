<?php

namespace App\Http\Repositories\Admin;

use App\Http\Repositories\Repository;
use App\Role;

class RolesRepository extends Repository
{
    public function model()
    {
        // TODO: Implement model() method.
        return app(Role::class);
    }
}
