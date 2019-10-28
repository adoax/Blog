<?php

namespace App\Controller;

use Knp\Component\Pager\PaginatorInterface;
use App\Entity\Article;
use App\Entity\Comment;
use App\Form\CommentType;
use App\Repository\ArticleRepository;
use App\Repository\CommentRepository;
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
    public function index(ArticleRepository $articleRepository, PaginatorInterface $paginate, Request $request): Response
    {

        $articles = $paginate->paginate(
            $articleRepository->findAllReverseQuery(),
            $request->query->getInt('page', 1),
            8
        );
        $articles->setCustomParameters([
            'align' => 'center'
        ]);
        return $this->render('article/index.html.twig', [
            'articles' => $articles,
        ]);
    }

    /**
     * @Route("/{id}-{slug}", name="article_show", methods={"GET", "POST"})
     */
    public function show(Request $request, Article $article): Response
    {
        $ParamsUrl = $request->attributes->get('_route_params');
        if ($ParamsUrl['slug'] !== $article->getSlug()) {
            throw new Exception("l'id est le slug ne correspond, ou la page existe pas");
        }

        $comment = new Comment();

        $form = $this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $comment->setUser($this->getUser());
            $comment->setArticle($article);
            $em->persist($comment);
            $em->flush();

            //Redirige sur le posts actuel
            return $this->redirect($request->headers->get('referer'));
        }

        return $this->render('article/show.html.twig', [
            'article' => $article,
            'form' => $form->createView()
        ]);
    }
}
