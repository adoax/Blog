<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Exception;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/article")
 */
class ArticleController extends AbstractController
{
    /**
     * @Route("/", name="article_index", methods={"GET"})
     */
    public function index (ArticleRepository $articleRepository): Response {
        return $this->render('article/index.html.twig', [
            'articles' => $articleRepository->findAll(),
        ]);
    }

    /**
     * @Route("/{id}-{slug}", name="article_show", methods={"GET"}, requirements={"slug": "[a-z0-9\-]*"})
     */
    public function show(Request $request, Article $article): Response
    {   
        $verif = $request->attributes->get('_route_params');

        if ($verif['slug'] !== $article->getSlug()) {
            throw new Exception("l'id est le slug ne correspond, ou la page existe pas");
        }
        return $this->render('article/show.html.twig', [
            'article' => $article,
        ]);
    }
}