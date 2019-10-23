<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OptionsRepository")
 * @ApiResource(
 * denormalizationContext={"disable_type_enforcement"=true},
 * normalizationContext={"groups"={"option_read"}})
 */
class Options
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read", "option_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read", "option_read"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Article", mappedBy="options")
     */
    private $articles;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }
    public function getValue()
    {
        return $this->id;
    }
    public function getLabel() {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->addOption($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            $article->removeOption($this);
        }

        return $this;
    }

    public function __toString()
    {
        return $this->name;
    }
}
