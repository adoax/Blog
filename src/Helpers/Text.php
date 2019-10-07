<?php

namespace App\Helpers;

class Text
{
    /**
     * Affiche les 60 premiers caractères, et coupent à la fin d'un mot
     *
     * @param string $content
     * @param integer $limit
     * @return void
     */
    public static function excerpt(string $content, int $limit = 60) {
        if (mb_strlen($content) <= $limit ) {
            return $content;
        }
        $lastSpace = mb_strpos($content, ' ', $limit);
        return mb_substr($content, 0, $lastSpace) . '...';
    }
}