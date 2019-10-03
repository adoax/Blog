<?php

namespace App\Controller\Admin;

use App\Entity\Article;
use App\Entity\Image;
use App\Form\ArticleType;
use Cocur\Slugify\Slugify;
use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/admin/article")
 */
class ArticleAdminController extends AbstractController
{

    /**
     * @Route("/", name="article_admin_index", methods={"GET"})
     */
    public function index(ArticleRepository $articleRepository): Response
    {
        return $this->render('admin/article/index.html.twig', [
            'articles' => $articleRepository->findAll()
        ]);
    }

    /**
     * @Route("/new", name="article_admin_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $slug = new Slugify();
        $article = new Article();

        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $article->setSlug($slug->slugify($article->getName()));
            $entityManager->persist($article);
            //dd($article);
           $entityManager->flush();
            
            return $this->redirectToRoute('article_index');
        }

        return $this->render('admin/article/new.html.twig', [
            'article' => $article,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/{id}", name="article_admin_show", methods={"GET"})
     */
    public function show(Article $article): Response
    {
        return $this->render('admin/article/show.html.twig', [
            'article' => $article,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="article_admin_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Article $article): Response
    {
        $slug = new Slugify();
        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $article->setSlug($slug->slugify($article->getName()));
            $article->setUpdatedAt(new \DateTime);
            $entityManager->persist($article);
            $entityManager->flush();
            return $this->redirectToRoute('article_admin_index');
        }

        return $this->render('admin/article/edit.html.twig', [
            'article' => $article,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/{id}", name="article_admin_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Article $article): Response
    {
        if ($this->isCsrfTokenValid('delete' . $article->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($article);
            $entityManager->flush();
        }

        return $this->redirectToRoute('article_admin_index');
    }

    /**
     * @Route("/{articleId}/{imageId}", name="articleImg_admin_delete", methods={"DELETE"})
     */
    public function deleteImages(Request $request, Article $article, $articleId, $imageId): Response
    {
        if ($this->isCsrfTokenValid('delete' . $article->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();

            $image = $em->getRepository(Article::class)->find($articleId);
            if (!$image) {
                throw $this->createNotFoundException('genus not found');
            }

            $imageArticle = $em->getRepository(Image::class)->find($imageId);
            if (!$imageArticle) {
                throw $this->createNotFoundException('scientist not found');
            }         

            $image->removeImage($imageArticle);
            $em->remove($article);
            $em->flush();
        }

        return $this->redirectToRoute('article_admin_index');
    }
}
