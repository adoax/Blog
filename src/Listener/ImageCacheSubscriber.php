<?php
namespace App\Listener;

use App\Entity\Image;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Liip\ImagineBundle\Imagine\Cache\CacheManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

class ImageCacheSubscriber implements EventSubscriber{
    /**
     * @var CacheManager
     */
    private $cacheManager;
    /**
     * @var UploaderHelper
     */
    private $uploaderHelper;

    /**
     * ImageCacheSubscribe constructor.
     * @param CacheManager $cacheManager
     * @param UploaderHelper $uploaderHelper
     */
    public function __construct(CacheManager $cacheManager, UploaderHelper $uploaderHelper)
    {

        $this->cacheManager = $cacheManager;
        $this->uploaderHelper = $uploaderHelper;
    }

    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return string[]
     */
    public function getSubscribedEvents()
    {
        return [
            'preRemove',
            'preUpdate'
        ];
    }

    public function preRemove(LifecycleEventArgs $args){
        $entity = $args->getEntity();
        if(!$entity instanceof Image){
            return;
        }

        $this->cacheManager->remove($this->uploaderHelper->asset($entity, 'fileName'));
    }

    public function  preUpdate(LifecycleEventArgs $args){
        $entity = $args->getEntity();
        if(!$entity instanceof Image){
            return;
        }

        if($entity->getFileName() instanceof UploadedFile){
            $this->cacheManager->remove($this->uploaderHelper->asset($entity, 'fileName'));
        }

    }
}