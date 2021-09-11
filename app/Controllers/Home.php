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
    public function spotifyApi(){
        echo view ('layouts/headerSpotify'); 
        echo view ('spotifyApi_view');
        echo view ('layouts/footerSpotify'); 
    }
}
