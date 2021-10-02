<?php

if (!defined('NGCMS')) {
    die('HAL');
}

function bb(&$tvars)
{
    $mapping = [
        'summernote' => [
            'js' => [
                'summernote-0.8.18/summernote-bs4.min.js',
                'summernote-0.8.18/lang/summernote-ru-RU.min.js',
                'summernote.js',
                'summernote-0.8.18/plugin/summernote-ext-elfinder/summernote-ext-elfinder.js',
                'summernote-0.8.18/plugin/elFinder/js/elfinder.min.js',
                'summernote-0.8.18/plugin/elFinder/js/jquery-ui.min.js',

            ],
            'css' => [
                'summernote-0.8.18/summernote-bs4.min.css',
                'summernote.css',
                'summernote-0.8.18/plugin/elFinder/css/elfinder.min.css',
                'summernote-0.8.18/plugin/elFinder/css/jquery-ui.css',
            ],
        ],
        'tinymce' => [
            'js' => [
                'tinymce.min.js',
                'tinymce.js',
            ],
            'css' => [],
        ],
        'wysibb' => [
            'js' => [
                'jquery.wysibb.js',
                'wysibb.js',
            ],
            'css' => [
                'theme/default/wbbtheme.css',
            ],
        ],
    ];

    $id = pluginGetVariable('wysiwyg', 'bb_editor');

    $list = [];

    if (isset($mapping[$id])) {
        if ('summernote' === $id) {
            $toolbar = pluginGetVariable('wysiwyg', 'toolbar');

            $list[] = '<script>window.wysiwyg_toolbar = "' . $toolbar . '"</script>';
        }

        foreach ($mapping[$id]['js'] as $v) {
            // Get URL
            $url = is_array($v) ? $v[0] : $v;

            // Add leading part if URL is not absolute
            if (!is_array($v) || $v[1] != 'absolute') {
                $url = admin_url . '/plugins/wysiwyg/bb_code/' . $id . '/' . $url;
            }

            $list[] = '<script type="text/javascript" src="' . $url . '"></script>';
        }

        foreach ($mapping[$id]['css'] as $v) {
            // Get URL
            $url = is_array($v) ? $v[0] : $v;

            // Add leading part if URL is not absolute
            if (!is_array($v) || $v[1] != 'absolute') {
                $url = admin_url . '/plugins/wysiwyg/bb_code/' . $id . '/' . $url;
            }

            $list[] = '<link rel="stylesheet" href="' . $url . '" type="text/css" media="screen" />';
        }
    }

    if (count($list)) {
        $tvars['preloadRAW'] = (isset($tvars['preloadRAW']) ? $tvars['preloadRAW'] : '') . join("\n", $list);
        $tvars['flags']['disableTagsSmilies'] = true;
        $tvars['editorClassName'] = 'bb_code';
    }
}

class wysiwygNewsFilter extends NewsFilter
{
    public function addNewsForm(&$tvars)
    {
        bb($tvars);

        return true;
    }

    public function editNewsForm($newsID, $SQLnews, &$tvars)
    {
        bb($tvars);

        return true;
    }
}

class wysiwygStaticFilter extends StaticFilter
{
    public function addStaticForm(&$tvars)
    {
        bb($tvars);

        return true;
    }

    public function editStaticForm($staticID, $SQLnews, &$tvars)
    {
        bb($tvars);

        return true;
    }
}

if (getPluginStatusActive('comments')) {
    loadPluginLibrary('comments', 'lib');

    class wysiwygFilterComments extends FilterComments
    {
        public function addCommentsForm($newsID, &$tvars)
        {
            bb($tvars);

            return true;
        }
    }

    register_filter('comments', 'wysiwyg', new wysiwygFilterComments);
}

register_filter('static', 'wysiwyg', new wysiwygStaticFilter);
register_filter('news', 'wysiwyg', new wysiwygNewsFilter);
