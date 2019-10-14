<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/react")
 */
class ReactController extends AbstractController
{
    /**
     * @Route("", name="index_react")
     */
    public function index()
    {
        return $this->render('react/index.html.twig', [
            'controller_name' => 'ReactController',
        ]);
    }

    /**
     * @Route("/show", name="show_react")
     */
    public function show() {
        return $this->render('react/show.html.twig');
    }
}
