<?php


namespace App\Http\Repositories\Admin;


use App\Http\Repositories\Repository;
use App\Models\Template;

class TemplatesRepository extends Repository
{
    public function model()
    {
        // TODO: Implement model() method.
        return app(Template::class);
    }
}
