<?php

namespace App\DataFixtures;

use App\Entity\Article;
use Cocur\Slugify\Slugify;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class ArticleFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {   
        $slugify = new Slugify();
       $faker = Factory::create('fr_FR');
        for ($i=0; $i < 25; $i++) { 
            $article = new Article();
            $article
                ->setName($faker->words(3, true))
                ->setContent($faker->words(35, true))
                ->setSlug($slugify->slugify($article->getName()));
            $manager->persist($article);

        }
        $manager->flush();
    }
}
