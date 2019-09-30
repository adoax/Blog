<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class UserFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        
        $faker = Factory::create('fr_FR');
        for ($i = 0; $i < 5; $i++) {
            $user = new User();
            $user
                ->setEmail($faker->email())
                ->setPassword(\password_hash('azerty', PASSWORD_BCRYPT, ['cost' => 12]));
            $manager->persist($user);
        }
        $manager->flush();
    }
}
