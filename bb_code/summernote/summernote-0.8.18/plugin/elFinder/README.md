elFinder
========

[![elFinder file manager for the Web](https://studio-42.github.io/elFinder/images/elFinderScr.png "elFinder file manager for the Web")](https://studio-42.github.io/elFinder/)

elFinder - это файловый менеджер с открытым исходным кодом для Интернета, написанный на JavaScript с использованием jQuery UI. Создание вдохновлено простотой и удобством программы Finder, используемой в операционной системе Mac OS X.

[![Download now!](https://studio-42.github.io/elFinder/images/download-icon.png)](https://github.com/Studio-42/elFinder/releases/latest)
[![Packagist License](https://poser.pugx.org/studio-42/elfinder/license.png)](https://choosealicense.com/licenses/bsd-3-clause/)
[![Latest Stable Version](https://poser.pugx.org/studio-42/elfinder/version.png)](https://packagist.org/packages/studio-42/elfinder)
[![Total Downloads](https://poser.pugx.org/studio-42/elfinder/d/total.png)](https://packagist.org/packages/studio-42/elfinder)
[![CDNJS version](https://img.shields.io/cdnjs/v/elfinder.svg)](https://cdnjs.com/libraries/elfinder)
[![Donate Paypal(nao-pon)](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FF5FKRSMKYDVA)
[![Donate Bitcoin(nao-pon)](https://img.shields.io/badge/Donate-Bitcoin-orange.svg)](https://studio-42.github.io/elFinder/tools/donate-bitcoin/)

СОДЕРЖАНИЕ
--------
* [Branches](#branches)
* [Features](#features)
* [Requirements](#requirements)
* [Installation](#installation)
* [Downloads](#downloads)
* [Demo Sites](#demo-sites)
* [FAQs](#faqs)
* [3rd Party Connectors](#3rd-party-connectors)
* [3rd Party Volume Drivers](#3rd-party-volume-drivers)
* [3rd Party Themes](#3rd-party-themes)
* [Support](#support)
* [Authors](#authors)
* [License](#license)

Ветви
--------
-  [master](https://github.com/Studio-42/elFinder/tree/master) - Main development branch
-  [2.1-src](https://github.com/Studio-42/elFinder/tree/2.1-src) - 2.1 development branch, auto build to 2.1 on commit
-  [2.1](https://github.com/Studio-42/elFinder/tree/2.1) - 2.1 nightly build branch

Функции
--------
*Удобство использования как MacOS Finder или Windows Explorer
*Удобный для мобильных устройств вид для сенсорных устройств
*Все операции с файлами и папками на удаленном сервере (копирование, перемещение, загрузка, создание папки / файла, переименование и т. Д.)
*Высокопроизводительный серверный бэкэнд и легкий клиентский интерфейс
*Поддержка нескольких корней
*Локальная файловая система, MySQL, FTP, SFTP, Box, Dropbox, GoogleDrive и драйверы хранения томов OneDrive
*Поддержка AWS S3, Azure, Digital Ocean Spaces и других с [League\Flysystem](https://github.com/barryvdh/elfinder-flysystem-driver) Flysystem driver
* Драйверы для облачного хранилища (Box, Dropbox, GoogleDrive и OneDrive)
*Фоновая загрузка файла / папки с поддержкой перетаскивания HTML5
*Загрузка файла по частям для большого файла
*Загрузить прямо в папку
*URL формы загрузки (или список)
*Просмотр списка и значков
*Горячие клавиши
*Стандартные методы выбора файлов / групп с помощью мыши или клавиатуры
*Перемещение / копирование файлов с помощью перетаскивания
*Перетащите и отпустите наружу, начав перетаскивание с нажатием клавиши alt / option
*Создание / извлечение архивов (zip, rar, 7z, tar, gzip, bzip2)
*Богатое контекстное меню и панель инструментов
*Quicklook, предварительный просмотр для распространенных типов файлов
*Редактировать текстовые файлы и изображения
*"Места" для избранных
*Рассчитать размеры каталогов
*Эскизы изображений, файлов фильмов
*Легко интегрируется с веб-редакторами (elRTE, CKEditor, TinyMCE)
*Гибкая настройка прав доступа, типов загружаемых файлов, пользовательского интерфейса и др.
*Расширяемость за счет обработки событий на стороне клиента и на стороне клиента
*Простой клиент-серверный API на основе JSON
*Поддерживает настраиваемую информацию в диалоговом окне информации
*Настраиваемые столбцы списка
*Поддерживает функцию настраиваемого класса CSS для значка настраиваемой папки
*Плагин коннектора
     * [AutoRotate](https://github.com/Studio-42/elFinder/blob/2.1-src/php/plugins/AutoRotate/plugin.php) : автоматический поворот при загрузке файла JPEG с ориентацией EXIF.
     * [AutoResize](https://github.com/Studio-42/elFinder/blob/2.1-src/php/plugins/AutoResize/plugin.php) : автоматическое изменение размера при загрузке файла.
     * [Normalizer](https://github.com/Studio-42/elFinder/blob/2.1-src/php/plugins/Normalizer/plugin.php) : UTF-8 нормализатор имени файла, пути к файлу и т. Д.
     * [Sanitizer](https://github.com/Studio-42/elFinder/blob/2.1-src/php/plugins/Sanitizer/plugin.php) : Дезинфицирующее средство имени файла, пути к файлу и т. Д.
     * [Watermark](https://github.com/Studio-42/elFinder/blob/2.1-src/php/plugins/Watermark/plugin.php) : печать водяного знака при загрузке файла.
 * Дополнительные сведения см. [Changelog](https://github.com/Studio-42/elFinder/blob/master/Changelog)

Требования
------------
### jQuery / jQuery UI
 * jQuery 1.8.0+
 * jQuery UI 1.9.0+
    * Обязательно: перетаскиваемый, перетаскиваемый, изменяемый размер, выбираемый, кнопка и ползунок
    *Рекомендовать: сортировщик (для сортировки столбца списка и мест)
Однако мы рекомендуем самую новую версию.

**However, we recommend newest version.**

### Клиент
 * Современные браузеры, как настольные, так и мобильные. elFinder был протестирован в новейших версиях Chrome, Edge, Firefox, IE и Opera.
     - **Внимание !**: Режим веб-приложения (метатег «apple-mobile-web-app-capacity») на iOS не работает должным образом в elFinder.
### Server
*Любой веб-сервер
*PHP 5.2+ (рекомендуется PHP 5.4 или выше) А для эскизов - модуль GD / Imagick / convert (imagemagick) требует
Рекомендуется PHP 7.1 или выше для поддержки не-ASCII символов пути / имени файла на сервере Windows.



Downloads
------------
**Stable releases** ([Changelog](https://github.com/Studio-42/elFinder/blob/master/Changelog))
 + [elFinder 2.1.59](https://github.com/Studio-42/elFinder/archive/2.1.59.zip)
 + [elFinder 2.0.9](https://github.com/Studio-42/elFinder/archive/2.0.9.zip) (deprecated)

**Nightly builds**
 + [elFinder 2.1.x (Nightly)](https://github.com/Studio-42/elFinder/archive/2.1.zip)

Demo sites
------------
**2.1.x Nightly**
 + https://studio-42.github.io/elFinder/ (with CORS)

FAQs
------------

### Should I use elFinder builds (compressed) or source (uncompressed)?

For debugging and development, use the [source](#source-uncompressed). For production, use [builds](#builds-compressed).

### How do I integrate elFinder with CKEditor/TinyMCE/elRTE/etc...?
Check out the [wiki](https://github.com/studio-42/elFinder/wiki#howtos) for individual instructions.

### The procedure of language files created or modified?

You can create or modify the language file to use translation tool. Please refer to the pull request the results to the respective branch.
 * [2.1 branch translation tool](http://studio-42.github.io/elFinder/tools/langman/#2.1)



 * [StudioJunkyard/elfinder-boostrap-theme](https://github.com/StudioJunkyard/LibreICONS/tree/master/themes/elFinder)


Support
-------

 * [Homepage](http://elfinder.org)
 * [Wiki](https://github.com/Studio-42/elFinder/wiki)
 * [Issues](https://github.com/Studio-42/elFinder/issues)
 * <dev@std42.ru>


Authors
-------

 * Current main developer: Naoki Sawada <hypweb+elfinder@gmail.com>
 * Chief developer: Dmitry "dio" Levashov <dio@std42.ru>
 * Maintainer: Troex Nevelin <troex@fury.scancode.ru>
 * Developers: Alexey Sukhotin, Naoki Sawada <hypweb+elfinder@gmail.com>
 * Icons: PixelMixer, [Yusuke Kamiyamane](http://p.yusukekamiyamane.com), [Icons8](https://icons8.com)

We hope our tools will be helpful for you.


License
-------

elFinder is issued under a 3-clauses BSD license.

 * [License terms](https://github.com/Studio-42/elFinder/blob/master/LICENSE.md)
