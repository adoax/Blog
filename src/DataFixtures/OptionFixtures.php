<?php

namespace App\DataFixtures;

use App\Entity\Options;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class OptionFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        for ($i=0; $i < 10; $i++) { 
            $option = new Options();
           $option
            ->setName($faker->city());
            $manager->persist($option);
        }
        

        $manager->flush();
    }
}
