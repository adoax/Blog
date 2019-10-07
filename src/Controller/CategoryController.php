<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\ArticleRepository;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/category")
 */
class CategoryController extends AbstractController
{
    /**
     * @Route("/", name="category_index")
     */
    public function index(CategoryRepository $categoryRepository)
    {
        return $this->render('category/index.html.twig', [
            'categories' => $categoryRepository->findAll(),
        ]);
    }

    /**
     * @Route("/category/{name}", name="category_links")
     */
    public function categoryLinkArticle (Category $category, ArticleRepository $articleRepository) {

        foreach ($articleRepository as $article) {
            dd($article);
        }

        return $this->render('category/link.html.twig', [
            'category' => $category,
            'articles' => $articleRepository->findAll()
        ]);
    }
}
