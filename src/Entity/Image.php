<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ImageRepository")
 * @Vich\Uploadable
 * @ApiResource(
 * denormalizationContext={"disable_type_enforcement"=true},
 * normalizationContext={"groups"={"images_read"}})
 */
class Image
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read", "images_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read", "images_read"})
     */
    private $url;

    /**
     * @Vich\UploadableField(mapping="article_image", fileNameProperty="url")
     */
    private $fileName;

    /**
     * 
     * @ORM\Column(type="string", length=255)
     * @Groups({"read", "images_read"})
     */
    private $caption;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Article", inversedBy="images")
     * @Groups({"images_read"})
     */
    private $article;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read", "images_read"})
     */
    private $update_at;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    public function getCaption(): ?string
    {
        return $this->caption;
    }

    public function setCaption(string $caption): self
    {
        $this->caption = $caption;

        return $this;
    }

    public function getArticle(): ?Article
    {
        return $this->article;
    }

    public function setArticle(?Article $article): self
    {
        $this->article = $article;

        return $this;
    }

    /**
     * Get the value of fileName
     *
     * @return  File
     */ 
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * Set the value of fileName
     *
     * @param  File  $fileName
     *
     * @return  self
     */ 
    public function setFileName(File $fileName)
    {
        $this->fileName = $fileName;
        
        if ($this->fileName instanceof UploadedFile) {
            $this->update_at = new \DateTime('now');
        }

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->update_at;
    }

    public function setUpdateAt(\DateTimeInterface $update_at): self
    {
        $this->update_at = $update_at;

        return $this;
    }
}
