<?php

namespace App\Controller;

use App\Form\CategoryType;
use Proxies\__CG__\App\Entity\Category;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @route("/category")
 */
class CategoryController extends AbstractController
{
    /**
     * @Route("/", name="category")
     */
    public function index()
    {
        return $this->render('category/index.html.twig', [
            'controller_name' => 'CategoryController',
        ]);
    }
    
    /**
     * @Route("/new", name="category_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response 
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();            
            $entityManager->persist($category);
            $entityManager->flush();

            return $this->redirectToRoute('category_new');
        }

        return $this->render('category/new.html.twig', [
            'category' => $category,
            'form' => $form->createView()
        ]);
    }
}
