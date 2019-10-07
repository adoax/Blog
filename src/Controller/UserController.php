<?php

namespace App\Controller;

use App\Form\UserPasswordResetType;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @route("/profil")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="app_profil", methods={"GET"})
     */
    public function profil()
    {
        return $this->render('user/index.html.twig');
    }

    /**
     * @Route("/changePassword", name="app_change_password")
     */
    public function changePassword(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $user = $this->getUser();
    	$form = $this->createForm(UserPasswordResetType::class, $user);
        
    	$form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            
            $oldPassword = $request->request->get('user_password_reset')['oldPassword'];
            // Si l'ancien mot de passe est bon
            if ($passwordEncoder->isPasswordValid($user, $oldPassword)) {
                $newEncodedPassword = $passwordEncoder->encodePassword($user, $user->getChangePassword());
                $user->setPassword($newEncodedPassword);
                
                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $user->setChangePassword("null");
                $em->flush();

                $this->addFlash('notice', 'Votre mot de passe à bien été changé !');

                return $this->redirectToRoute('app_profil');
            } else {
                $form->addError(new FormError('Ancien mot de passe incorrect'));
            }
        }
    	
    	return $this->render('user/reset.html.twig',[
    		'form' => $form->createView(),
    	]);
    }


}
