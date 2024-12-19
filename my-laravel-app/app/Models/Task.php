<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'completed','task_list_id'];


    protected $casts = [
        'completed' => 'boolean',
    ];


    public function taskList()
    {
        return $this->belongsTo(TaskList::class);
    }
}
