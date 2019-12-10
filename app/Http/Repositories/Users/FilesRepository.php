<?php


namespace App\Http\Repositories\Users;


use App\Http\Repositories\Repository;
use App\Models\File;

class FilesRepository extends Repository
{
    public function model()
    {
        // TODO: Implement model() method.
        return app(File::class);
    }
}
