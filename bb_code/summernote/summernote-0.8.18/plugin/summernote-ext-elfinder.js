(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {
    // Extends plugins for adding readmore.
    //  - plugin is external module for customizing.
    $.extend($.summernote.plugins, {
        /**
          * @param {Object} context - context object has status of editor.
          */
        'elfinder': function (context) {
            var self = this;
            // ui has renders to build ui elements.
            //  - you can create a button with `ui.button`
            var ui = $.summernote.ui;
            // add elfinder button
            context.memo('button.elfinder', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-list-alt"/>',
                    tooltip: 'Файловый менеджер',
                    click: function () {
                        elfinderDialog(context);
                    }
                });
                // create jQuery object from button instance.
                var $elfinder = button.render();
                return $elfinder;
            });
            // This methods will be called when editor is destroyed by $('..').summernote('destroy');
            // You should remove elements on `initialize`.
            this.destroy = function () {
                this.$panel.remove();
                this.$panel = null;
            };
        }
    });

    function elfinderDialog(context) {
        $('<div/>').dialogelfinder({
            url: '/engine/plugins/wysiwyg/bb_code/summernote/summernote-0.8.18/plugin/elFinder/php/connector.minimal.php', // change with the url of your connector
            baseUrl: '/engine/plugins/wysiwyg/bb_code/summernote/summernote-0.8.18/plugin/elFinder/',
            lang: 'ru',
            width: 840,
            height: 450,
            destroyOnClose: true,
            getFileCallback: function (file, fm) {
                context.invoke('insertImage', file.url);
            },
            commandsOptions: {
                getfile: {
                    oncomplete: 'close',
                    folders: false
                }
            },
        }).dialogelfinder('instance');
    }
}));
