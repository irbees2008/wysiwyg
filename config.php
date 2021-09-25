<?php

if (! defined('NGCMS')) {
    die('HAL');
}

pluginsLoadConfig();
LoadPluginLang($plugin, 'config');

$bb_list = array_merge([
    'Стандартный',
], ListFiles(extras_dir.'/wysiwyg/bb_code', ''));

// print '<pre>'.var_export($bb_list).'</pre>';

$cfg = [];
$cfgX = [];

array_push($cfg, [
    'descr' => 'Описание',
]);

array_push($cfgX, [
    'name' => 'bb_editor',
    'title' => 'Текущий редактор',
    'descr' => 'Выберите используемый редактор.',
    'type' => 'select',
    'values' => $bb_list,
    'value' => pluginGetVariable($plugin, 'bb_editor'),
]);

array_push($cfgX, [
    'name' => 'toolbar',
    'title' => 'Панель инструментов редактора',
    'descr' => 'Выберите набор кнопок панели инструментов редактора, если таковой поддерживается им.',
    'type' => 'select',
    'values' => [
        'minimal' => 'Минимальный',
        'default' => 'По умолчанию',
        'maximum' => 'Максимальный',
    ],
    'value' => pluginGetVariable($plugin, 'toolbar'),
]);

array_push($cfg, [
    'mode' => 'group',
    'title' => '<b>Общие настройки</b>',
    'entries' => $cfgX,
]);

if ('commit' === $_REQUEST['action']) {
    commit_plugin_config_changes($plugin, $cfg);
    print_commit_complete($plugin);
} else {
    generate_config_page($plugin, $cfg);
}
