<?php


namespace App\Http\Repositories\Admin;


use App\Http\Repositories\Repository;
use App\Models\Asset;

class AssetsRepository extends Repository
{
    public function model()
    {
        // TODO: Implement model() method.
        return app(Asset::class);
    }
}
