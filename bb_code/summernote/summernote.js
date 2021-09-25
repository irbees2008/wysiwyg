// https://github.com/summernote/summernote/issues/4136

jQuery(function () {
	function htmlEntities(str) {
		return String(str)
			// .replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			// .replace(/"/g, '&quot;');
	}

	function bbCodeCallback(context, $dropdown) {
		$dropdown.find('a').each(function (index, item) {
			$(item).on('click', function (event) {
				event.preventDefault();

				const bbCode = JSON.parse(
					$(item).attr('data-value').replace(/'/g, '"')
				);

				insertBbCode(context, bbCode.pre, bbCode.post);
			});
		});
	}

	function insertBbCode(context, pre, post) {
		const selected = htmlEntities(
			$.summernote.range.create() || ''
		);

		context.invoke(
			'editor.pasteHTML',
			pre + selected + post
		);
	}

	function insertTextInCodeView(context, text) {
		const [target] = context.layoutInfo.codable;
		const isActivated = context.invoke('codeview.isActivated');

		if (isActivated && 'selectionStart' in target) {
			const startPos = target.selectionStart;

			target.value = target.value.substring(0, startPos)
				+ text
				+ target.value.substring(startPos, target.value.length);

			target.selectionStart = target.selectionEnd = startPos;

			target.focus();
		}
	}

	const summernoteToolbars = {
		minimal: [
			['save', ['publish']],
			['edit', ['undo', 'redo']],
			['style', ['bold', 'italic', 'underline', /**'superscript', 'subscript',**/ 'strikethrough', 'clear']],
			['headline', ['style']],
			['para', ['ul', 'ol', 'paragraph']],
			['bbCode', ['bbCode']],
			['insert', ['link', 'picture', 'file']],
			['view', ['fullscreen', 'codeview', 'help']],
			['advanced', ['nextpage', 'more']],
		],
		default: [
			['save', ['publish']],
			['edit', ['undo', 'redo']],
			['style', ['bold', 'italic', 'underline', /**'superscript', 'subscript',**/ 'strikethrough', 'clear']],
			['headline', ['style']],
			['fontname', ['fontname']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['bbCode', ['bbCode']],
			['insert', ['link', 'picture', 'file']],
			['view', ['fullscreen', 'codeview', 'help']],
			['advanced', ['nextpage', 'more']],
		],
		maximum: [
			['save', ['publish']],
			['edit', ['undo', 'redo']],
			['preformatted', ['preformatted']],
			['style', ['bold', 'italic', 'underline', /**'superscript', 'subscript',**/ 'strikethrough', 'clear']],
			['headline', ['style']],
			['fontname', ['fontname']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['bbCode', ['bbCode']],
			['insert', ['link', 'picture', 'file', 'video', 'table', 'hr']],
			['view', ['fullscreen', 'codeview', 'help']],
			['advanced', ['nextpage', 'more']],
		],
	}

	$('textarea.bb_code').summernote({
		lang: 'ru-RU',
		toolbar: summernoteToolbars[wysiwyg_toolbar || 'default'],
		styleTags: [
			/**'h1',**/ 'h2', 'h3', 'h4', 'h5', 'p'
		],
		buttons: {
			publish: function (context) {
				const ui = $.summernote.ui;
				const tooltip = NGCMS.lang['btn_save'];

				const button = ui.button({
					contents: `<i class="fa fa-floppy-o" title="${tooltip}" />`,
					// tooltip: tooltip,
					click: function (event) {
						$(this).closest('form').trigger('submit');
					},
				});

				return button.render();
			},
			preformatted: function (context) {
				const ui = $.summernote.ui;

				const buttonGroup = ui.buttonGroup([
					ui.button({
						className: 'dropdown-toggle',
						contents: '<i class="fa fa-code" /> <span class="note-icon-caret"></span>',
						data: {
							toggle: 'dropdown',
						},
					}),
					ui.dropdown({
						items: [
							{ title: 'Вставить код без подсветки', value: "{'pre':'[strong]', 'post':'[/strong]'}" },
							{ title: 'Вставить код HTML', value: "{'pre':'[code=html]', 'post':'[/code]'}" },
							{ title: 'Вставить код CSS', value: "{'pre':'[code=css]', 'post':'[/code]'}" },
							{ title: 'Вставить код JS', value: "{'pre':'[code=js]', 'post':'[/code]'}" },
							{ title: 'Вставить код PHP', value: "{'pre':'[code=php]', 'post':'[/code]'}" },
							{ title: 'Вставить код SQL', value: "{'pre':'[code=sql]', 'post':'[/code]'}" },
						],
						template: function (item) {
							return item.title;
						},
						callback: function ($dropdown) {
							return bbCodeCallback(context, $dropdown);
						},
					})
				]);

				return buttonGroup.render();
			},
			file: function (context) {
				const ui = $.summernote.ui;
				const tooltip = NGCMS.lang['tags.file'];
				const token = $('input[name="token"]').val();

				const button = ui.button({
					contents: `<i class="fa fa-file-text-o" title="${tooltip}" />`,
					// tooltip: tooltip,
					click: function (event) {
						const input = $('<input type="file" hidden style="display: none;" />');

						$(input).on('change', function (event) {

							if (!this.files || !this.files.length) {
								return false;
							}

							const formData = new FormData();

							formData.append('Filedata', this.files[0]);
							// ngAuthCookie: '{authcookie}',
							formData.append('uploadType', 'file');
							// category: $('#categorySelect').val(),
							// formData.append('rand', 1);
							// formData.append('replace', 0);

							$.ajax({
								method: 'POST',
								url: '/engine/rpc.php?methodName=admin.files.upload',
								headers: {
									'X-CSRF-TOKEN': token,
									'X-Requested-With': 'XMLHttpRequest',
								},
								data: formData,
								cache: false,
								contentType: false,
								processData: false,
								beforeSend: function () {
									ngShowLoading();
								},
							})
								.then(function (response) {
									if (!response.status) {
										throw new Error(`
											<h5>${NGCMS.lang['msge_error']} [${response.errorCode}]</h5>
											<p>${response.errorText}</p>
											<p>${response.errorDescription}</p>
										`);
									}

									return response;
								})
								.done(function (response, textStatus, jqXHR) {
									$('textarea.bb_code').summernote(
										'insertText',
										`[attach#${response.data.id}]${response.data.name}[/attach]`
									);
								})
								.fail(function (error) {
									ngNotifySticker(error.message || NGCMS.lang.rpc_httpError, {
										className: 'alert-danger',
										closeBTN: true
									});
								})
								.always(function () {
									ngHideLoading();
								});
						}).trigger('click');
					},
				});

				return button.render();
			},
			bbCode: function (context) {
				const ui = $.summernote.ui;

				const buttonGroup = ui.buttonGroup([
					ui.button({
						className: 'dropdown-toggle',
						contents: '<i class="fa fa-quote-left" /> <span class="note-icon-caret"></span>',
						data: {
							toggle: 'dropdown',
						},
					}),
					ui.dropdown([
						ui.buttonGroup({
							className: 'note-tags',
							children: [
								ui.button({
									contents: `<i class="fa fa-code" title="${NGCMS.lang['tags.code']}" />`,
									click: function (event) { insertBbCode(context, '[code]', '[/code]') },
								}),
								ui.button({
									contents: `<i class="fa fa-envelope-o" title="${NGCMS.lang['tags.email']}" />`,
									click: function (event) { insertBbCode(context, '[email]', '[/email]') },
								}),
								ui.button({
									contents: `<i class="fa fa-list-alt" title="${NGCMS.lang['tags.spoiler']}" />`,
									click: function (event) { insertBbCode(context, '[spoiler]', '[/spoiler]') },
								}),
								ui.button({
									contents: `<i class="fa fa-tags" title="${NGCMS.lang['tags.acronym']}" />`,
									click: function (event) { insertBbCode(context, '[acronym=]', '[/acronym]') },
								}),
								ui.button({
									contents: `<i class="fa fa-shield" title="${NGCMS.lang['tags.hide']}" />`,
									click: function (event) { insertBbCode(context, '[hide]', '[/hide]') },
								}),
								ui.button({
									contents: `<i class="fa fa-quote-left" title="${NGCMS.lang['tags.quote']}" />`,
									click: function (event) { insertBbCode(context, '[quote]', '[/quote]') },
								}),
							],
						})
					])
				]);

				return buttonGroup.render();
			},
			nextpage: function (context) {
				const ui = $.summernote.ui;
				const tooltip = NGCMS.lang['tags.nextpage'];

				const button = ui.button({
					contents: `<i class="fa fa-files-o" title="${tooltip}" />`,
					// tooltip: tooltip,
					codeviewKeepButton: true,
					click: function (event) {
						return insertTextInCodeView(context, '<!--nextpage-->');
					},
				});

				return button.render();
			},
			more: function (context) {
				const ui = $.summernote.ui;
				const tooltip = NGCMS.lang['tags.more'];

				const button = ui.button({
					contents: `<i class="fa fa-ellipsis-h" title="${tooltip}" />`,
					// tooltip: tooltip,
					codeviewKeepButton: true,
					click: function (event) {
						return insertTextInCodeView(context, '<!--more-->');
					},
				});

				return button.render();
			},
		},
		callbacks: {
			onImageUpload: function (files) {
				const currentEditorContainer = this;
				const token = $('input[name="token"]').val();

				// upload image to server and create imgNode...
				const formData = new FormData();

				formData.append('Filedata', files[0]);
				// ngAuthCookie: '{authcookie}',
				formData.append('uploadType', 'image');
				// category: $('#categorySelect').val(),
				formData.append('rand', 1);
				// replace: $('#flagReplace').is(':checked') ? 1 : 0,
				formData.append('thumb', 1);
				// stamp: $('#flagStamp').is(':checked') ? 1 : 0,
				// shadow: $('#flagShadow').is(':checked') ? 1 : 0

				$.ajax({
					method: 'POST',
					url: '/engine/rpc.php?methodName=admin.files.upload',
					headers: {
						'X-CSRF-TOKEN': token,
						'X-Requested-With': 'XMLHttpRequest',
					},
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
					beforeSend: function () {
						ngShowLoading();
					},
				})
					.then(function (response) {
						if (!response.status) {
							throw new Error(`
								<h5>${NGCMS.lang['msge_error']} [${response.errorCode}]</h5>
								<p>${response.errorText}</p>
								<p>${response.errorDescription}</p>
							`);
						}

						return response;
					})
					.done(function (response, textStatus, jqXHR) {
						$(currentEditorContainer).summernote(
							'insertImage',
							`/uploads/images/${response.data.category}${response.data.name}`,
							function ($image) {
								$image.css('width', '100%');
							}
						);
					})
					.fail(function (error) {
						// title: `<h5>${NGCMS.lang.notifyWindowError}</h5>`,
						ngNotifySticker(error.message || NGCMS.lang.rpc_httpError, {
							className: 'alert-danger',
							closeBTN: true
						});
					})
					.always(function () {
						ngHideLoading();
					});
			}
		}
	});
});