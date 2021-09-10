<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        echo view('layouts/headerVistaInicial'); 
        echo view('vistaInicial_view'); 
        echo view('layouts/footerVistaInicial'); 
    }
}
